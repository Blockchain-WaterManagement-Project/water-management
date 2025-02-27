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
      <div>
        <h2>Mint NFT</h2>
        <form onSubmit={handleMint}>
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Token URI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}>
            {loading ? "Minting..." : "Mint NFT"}
          </button>
        </form>
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
      </div>
    );
  };

export default Tokenize;