import { useState } from "react";
import { useEth } from "../../contexts/EthContext";

const Tokenize = () =>{
    const { state } = useEth();
    const [recipient, setRecipient] = useState("");
    const [tokenURI, setTokenURI] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const handleMint = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setSuccess(null);
  
      try {
        // Call the mintNFT method from the smart contract
        const result = await state.contract2.methods.mintNFT(recipient, tokenURI).send({ from: state.accounts[0] });
        console.log("Minting successful:", result);
        setSuccess("NFT minted successfully!");
      } catch (err) {
        console.error("Error minting NFT:", err);
        setError("Failed to mint NFT. Please check the recipient address and token URI.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Mint NFT</h2>
        <form onSubmit={handleMint} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "80%", borderRadius: "4px", border: "1px solid #ddd" }}
            required
          />
          <input
            type="text"
            placeholder="Token URI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "80%", borderRadius: "4px", border: "1px solid #ddd" }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{ margin: "10px", padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#4CAF50", color: "white", cursor: "pointer" }}
          >
            {loading ? "Minting..." : "Mint NFT"}
          </button>
        </form>
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
        {success && <div style={{ color: "green", textAlign: "center" }}>{success}</div>}
      </div>
    );
  };

export default Tokenize;