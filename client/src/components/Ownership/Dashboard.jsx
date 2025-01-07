import React, { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";
import { Link } from 'react-router-dom';

export const Dashboard = () => {
  const { state } = useEth();
  const { contract2 } = state; // Accessing contract2 from the EthContext
  const [owner, setOwner] = useState("");
  const [recentTokens, setRecentTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tokenId, setTokenId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent events (minted, updated, deleted, transferred)
        const filterMinted = contract2.filters.Transfer(null, null);
        const events = await contract2.queryFilter(filterMinted);

        const allEvents = events.map(event => ({
          type: event.event,
          tokenId: event.args.tokenId.toString(),
          from: event.args.from,
          to: event.args.to,
          timestamp: new Date(event.blockTimestamp * 1000).toLocaleString(),
        }));

        setRecentTokens(allEvents);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contract2]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOwnerCheck = async () => {
    if (!tokenId) return;
    try {
      const tokenOwner = await contract2.ownerOf(tokenId);
      setOwner(tokenOwner);
    } catch (err) {
      console.error("Error fetching token owner:", err);
      setError("Failed to fetch token owner. Please check the token ID.");
    }
  };

  const filteredTokens = recentTokens.filter(token => 
    token.tokenId.includes(searchTerm) || token.from.includes(searchTerm) || token.to.includes(searchTerm)
  );

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>WaterNFT Dashboard</h2>
      
      {/* Navigation Section */}
      <nav style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f1f1f1", borderRadius: "8px" }}>
        <ul style={{ listStyleType: "none", padding: 0, display: "flex", justifyContent: "space-around" }}>
          <li>
            <Link to="/asset/tokenize" style={{ textDecoration: "none", color: "#333" }}>Create NFT</Link>
          </li>
          <li>
            <Link to="/asset/read" style={{ textDecoration: "none", color: "#333" }}>Read NFT</Link>
          </li>
          <li>
            <Link to="/asset/update" style={{ textDecoration: "none", color: "#333" }}>Update NFT</Link>
          </li>
          <li>
            <Link to="/asset/transfer" style={{ textDecoration: "none", color: "#333" }}>Transfer NFT</Link>
          </li>
          <li>
            <Link to="/asset/delete" style={{ textDecoration: "none", color: "#333" }}>Delete NFT</Link>
          </li>
        </ul>
      </nav>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div style={{ marginBottom: "20px" }}>
        <input 
          type="text" 
          placeholder="Token ID to check owner" 
          value={tokenId} 
          onChange={(e) => setTokenId(e.target.value)} 
          style={{ margin: "10px 0", padding: "8px", width: "80%" }} 
        />
        <button onClick={handleOwnerCheck} style={{ padding: "8px 16px", marginLeft: "10px" }}>Check Owner</button>
        {owner && <p>Owner of Token ID {tokenId}: {owner}</p>}
      </div>

      <div>
        <h3>Recent Token Events</h3>
        <input 
          type="text" 
          placeholder="Search by Token ID or Address" 
          value={searchTerm} 
          onChange={handleSearch} 
          style={{ margin: "10px 0", padding: "8px", width: "80%" }} 
        />
        <ul>
          {filteredTokens.map((token, index) => (
            <li key={index}>
              <strong>Token ID:</strong> {token.tokenId} | 
              <strong> From:</strong> {token.from} | 
              <strong> To:</strong> {token.to} | 
              <strong> Timestamp:</strong> {token.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};