import React, { useEffect, useState } from "react";
import { useEth } from "../../contexts/EthContext";

const UpdateNFT = () => {
  const { state } = useEth();
  const [tokenId, setTokenId] = useState("");
  const [newTokenURI, setNewTokenURI] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Call the updateNFT method from the smart contract
      const result = await state.contract2.methods.updateNFT(tokenId, newTokenURI).send({ from: state.accounts[0] });
      console.log("Update successful:", result);
      setSuccess("Token URI updated successfully!");
    } catch (err) {
      console.error("Error updating token URI:", err);
      setError("Failed to update token URI. Please check the token ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Update NFT Token URI</h2>
      <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          style={{ margin: "10px", padding: "10px", width: "80%", borderRadius: "4px", border: "1px solid #ddd" }}
          required
        />
        <input
          type="text"
          placeholder="New Token URI"
          value={newTokenURI}
          onChange={(e) => setNewTokenURI(e.target.value)}
          style={{ margin: "10px", padding: "10px", width: "80%", borderRadius: "4px", border: "1px solid #ddd" }}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{ margin: "10px", padding: "10px 20px", borderRadius: "4px", border: "none", backgroundColor: "#4CAF50", color: "white", cursor: "pointer" }}
        >
          {loading ? "Updating..." : "Update Token URI"}
        </button>
      </form>
      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
      {success && <div style={{ color: "green", textAlign: "center" }}>{success}</div>}
    </div>
  );
};

export default UpdateNFT;