import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [reencryptPk, setReencryptPk] = useState('');
  const [result, setResult] = useState('');
  const [data, setData] = useState('');
  const inputRef = useRef(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

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

  const handleCopy = () => {
    inputRef.current.select();
    inputRef.current.setSelectionRange(0, 99999); // For mobile devices

    navigator.clipboard.writeText(inputRef.current.value)
      .then(() => {
        alert("Copied the text: " + inputRef.current.value);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const fetchReencryptPk = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/keys/generate`, {
        username: username,
      });
      console.log(response);
      setResult(response.data.publicKey);
    } catch (error) {
      console.log(error);
      setError("Failed to generate re-encryption key.");
    }
  };

  const fetchEncryptedData = async (e) => {
    e.preventDefault();
    if (data === "") return alert('Enter data to encrypt!');
    
    try {
      const response = await axios.post(`http://localhost:3000/api/encrypt`, {
        username: username,
        plaintext: data
      });
      console.log(response);
      setResult(response.data.ciphertext);
    } catch (error) {
      console.log(error);
      setError("Failed to encrypt data.");
    }
  };

  const fetchDecryptedData = async (e) => {
    e.preventDefault();
    if (data === "") return alert('Enter data to decrypt!');
    
    try {
      const response = await axios.post(`http://localhost:3000/api/decrypt`, {
        username: username,
        ciphertext: data
      });
      console.log(response);
      setResult(response.data.plaintext);
    } catch (error) {
      console.log(error);
      setError("Failed to decrypt data.");
    }
  };

  return (
    <div className='data-wrapper' style={{ maxWidth: '100%', overflowX: 'hidden', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <div>
        <button
          style={{ background: '#4CAF50', color: '#fff', padding: '10px 20px', margin: '10px 0', border: 'none', borderRadius: '4px', cursor: 'pointer' }} 
          onClick={fetchReencryptPk}>Get Re-encryption (pk)</button>
      </div>
      <div className='data-container' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', position: 'relative', margin: '1rem 0' }}>
        <div className='data data-encryption' style={{ flex: '0.5' }}>
          <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px' }}>Encrypt Your Information</h5>
          <form onSubmit={fetchEncryptedData}>
            <textarea
              rows={3} 
              name='data'
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: ' 1px solid #ccc', margin: '10px 0' }}
              onChange={e => setData(e.target.value)}></textarea>
            <button 
              type='submit'
              style={{ background: '#4CAF50', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Encrypt
            </button>
          </form>
        </div>
        <div className='data data-dencryption' style={{ flex: '0.5' }}>
          <h5 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px' }}>Decrypt Your Information</h5>
          <form onSubmit={fetchDecryptedData}>
            <textarea
              rows={3} 
              name='data'
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', margin: '10px 0' }}
              onChange={e => setData(e.target.value)}></textarea>
            <button 
              type='submit'
              style={{ background: '#4CAF50', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Decrypt
            </button>
          </form>
        </div>
      </div>
      <div className='data data-results' style={{ margin: '1rem 0' }}>
        <input
          type='text'
          ref={inputRef}
          id='copy'
          value={result ? JSON.stringify(result) : 'Your Results'}
          style={{
            width: '100%',
            height: '300px',
            padding: '10px 20px',
            margin: '10px 0',
            color: '#eee',
            background: '#242424',
            borderRadius: '4px',
            overflowY: 'scroll'
          }} />
        <button
          type='button'
          style={{ width: '100%', height: '50px', background: '#04AA6D', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          onClick={handleCopy}>Copy Text</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Dashboard;