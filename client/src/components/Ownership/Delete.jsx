import { useState } from "react";
import { useEth } from "../../contexts/EthContext";

const Delete = () =>{
    const { state } = useEth();
    const [tokenId, setTokenId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const handleBurn = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setSuccess(null);
  
      try {
        // Call the burnNFT method from the smart contract
        const result = await state.contract2.methods.burnNFT(tokenId).send({ from: state.accounts[0] });
        console.log("Burn successful:", result);
        setSuccess("NFT burned successfully!");
      } catch (err) {
        console.error("Error burning NFT:", err);
        setError("Failed to burn NFT. Please check the token ID and try again.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Burn NFT</h2>
        <form onSubmit={handleBurn} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "80%", borderRadius: "4px", border: "1px solid #ddd" }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{ margin: "10px", padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#e74c3c", color: "white", cursor: "pointer" }}
          >
            {loading ? "Burning..." : "Burn NFT"}
          </button>
        </form>
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
        {success && <div style={{ color: "green", textAlign: "center" }}>{success}</div>}
      </div>
    );
};

export default Delete;