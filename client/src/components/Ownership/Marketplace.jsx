import React, { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";

const Marketplace = () => {
  const { state } = useEth();
  const [mintedNFTs, setMintedNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMintedNFTs = async () => {
      try {
        setLoading(true);
        const tokenIds = await state.contract2.methods.fetchAllTokenIds().call();
        
        const nfts = await Promise.all(tokenIds.map(async (tokenId) => {
          const tokenURI = await state.contract2.methods.fetchTokenURI(tokenId).call();
          const owner = await state.contract2.methods.fetchNFTOwner(tokenId).call();
          
          console.log(`Fetching metadata from: ${tokenURI}`);
          try {
            const response = await fetch(tokenURI);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
              throw new Error(`Expected JSON but received ${contentType}`);
            }
            const metadata = await response.json();
    
            // Check if the metadata is valid
            if (!metadata.name || !metadata.description || !metadata.image) {
              console.warn(`Skipping NFT ID ${tokenId} due to invalid metadata.`);
              return null; // Skip this NFT
            }
    
            return { id: tokenId, ...metadata, owner };
          } catch (err) {
            console.error(`Error fetching metadata for token ID ${tokenId}:`, err);
            return null; // Skip this NFT
          }
        }));
    
        // Filter out any null values (invalid NFTs)
        setMintedNFTs(nfts.filter(nft => nft !== null));
      } catch (err) {
        setError("Failed to fetch minted NFTs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (state.contract2) {
      fetchMintedNFTs();
    }
  }, [state.contract2]);

  if (loading) {
    return <div>Loading minted NFTs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Minted NFTs</h2>
      <div className="nft-list" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {mintedNFTs.map((nft) => (
          <div key={nft.id} className="nft-card" style={{ border: "1px solid #ddd", borderRadius: "8px", margin: "10px", padding: "10px", width: "200px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
            <h3 style={{ fontSize: "18px", color: "#555" }}>NFT ID: {nft.id}</h3>
            <p style={{ fontSize: "8px", color: "#777" }}>Owner: {nft.owner}</p>
            <p style={{ fontSize: "14px", color: "#777" }}>Name: {nft.name}</p>
            <p style={{ fontSize: "14px", color: "#777" }}>Description: {nft.description}</p>
            <img src={nft.image} alt={`NFT ${nft.id}`} style={{ width: "100%", height: "auto", borderRadius: "4px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;