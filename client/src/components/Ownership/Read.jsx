import { useState, useEffect } from "react";
import axios from "axios";
import { useEth } from "../../contexts/EthContext";

const Read = () =>{
    const { state } = useEth();
    const { contract2 } = state; // Accessing contract2 from the EthContext
    const [username, setUsername] = useState("");
    const [tokenId, setTokenId] = useState("");
    const [metadata, setMetadata] = useState(null);
    const [ciphertext, setCiphertext] = useState("");
    const [decryptedData, setDecryptedData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchAccount = async () => {
        if (window.ethereum) {
          try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setUsername(accounts[0]); // Set the first account as the username
          } catch (err) {
            console.error("Error fetching account:", err);
            setError("Failed to fetch account. Please ensure MetaMask is connected.");
          }
        } else {
          setError("MetaMask is not installed. Please install it to use this feature.");
        }
      };
  
      fetchAccount();
    }, []);
  
    const fetchTokenURI = async () => {
      try {
        const uri = await contract2.methods.tokenURI(tokenId).call();
        fetchMetadata(uri);
      } catch (err) {
        console.error("Error fetching token URI:", err);
        setError("Failed to fetch token URI. Please check the token ID.");
      }
    };
  
    const fetchMetadata = async (uri) => {
      try {
        const response = await axios.get(uri);
        setMetadata(response.data);
        // Check if the metadata has data to decrypt
        if (response.data && response.data.data) {
          setCiphertext(response.data.data); // Assuming the encrypted data is in the 'data' field
        } else {
          alert("This NFT does not contain any data.");
          setCiphertext(""); // Clear ciphertext if no data
        }
      } catch (err) {
        console.error("Error fetching metadata:", err);
        setError("Failed to fetch metadata. Please check the token URI.");
      }
    };
  
    const decryptData = async () => {
      if (!ciphertext) {
        alert("No ciphertext available to decrypt.");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:3000/api/users/decrypt-for-self", {
          username: username,
          ciphertext: ciphertext,
        });
        setDecryptedData(response.data);
      } catch (err) {
        console.error("Error decrypting data:", err);
        setError("Failed to decrypt data. Please try again.");
      }
    };
  
    return (
      <div style={{ padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
        <h2>NFT Data Reader</h2>
        <input
          type="text"
          placeholder="Token ID"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
          style={{ margin: "10px 0", padding: "8px", width: "80%" }}
        />
        <button onClick={fetchTokenURI} style={{ padding: "8px 16px", marginLeft: "10px" }}>Fetch Metadata</button>
  
        {metadata && (
          <div>
            <h3>Metadata:</h3>
            <pre>{JSON.stringify(metadata, null, 2)}</pre>
            {ciphertext && (
              <div>
                <h4>Encrypted Data:</h4>
                <pre>{ciphertext}</pre>
                <button onClick={decryptData} style={{ padding: "8px 16px", marginLeft: "10px" }}>Decrypt Data</button>
                {decryptedData && (
                  <div>
                    <h3>Decrypted Data:</h3>
                    <pre>{JSON.stringify(decryptedData, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
  
        <input
          type="text"
          placeholder="Username (Auto-fetched)"
          value={username}
          readOnly
          style={{ margin: "10px 0", padding: "8px", width: "80%" }}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    );
};

export default Read;