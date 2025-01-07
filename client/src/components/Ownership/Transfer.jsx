import { useState } from "react";
import { useEth } from "../../contexts/EthContext";

const Transfer = () =>{
    const { state } = useEth();
    const [recipient, setRecipient] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
  
    const handleTransfer = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      setSuccess(null);
  
      try {
        // Call the safeTransferFrom method from the smart contract
        const result = await state.contract.methods.safeTransferFrom(state.accounts[0], recipient, tokenId).send({ from: state.accounts[0] });
        console.log("Transfer successful:", result);
        setSuccess("NFT transferred successfully!");
      } catch (err) {
        console.error("Error transferring NFT:", err);
        setError("Failed to transfer NFT. Please check the recipient address and token ID.");
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#333" }}>Transfer NFT</h2>
        <form onSubmit={handleTransfer} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
            placeholder="Token ID"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            style={{ margin: "10px", padding: "10px", width: "80%", borderRadius: "4px", border: "1px solid #ddd" }}
            required
          />
          <button
            type="submit"
            disabled={loading}
            style={{ margin: "10px", padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#4CAF50", color: "white", cursor: "pointer" }}
          >
            {loading ? "Transferring..." : "Transfer NFT"}
          </button>
        </form>
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
        {success && <div style={{ color: "green", textAlign: "center" }}>{success}</div>}
      </div>
    );
  };
  
  export default Transfer;