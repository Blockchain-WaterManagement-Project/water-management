import { useState } from 'react';
import axios from 'axios';

const Reencryption = () => {
  const [username, setUsername] = useState('');
  const [plaintext, setPlaintext] = useState('');
  const [ciphertext, setCiphertext] = useState('');
  const [reEncryptionKey, setReEncryptionKey] = useState({});
  const [decryptedMessage, setDecryptedMessage] = useState('');

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const generateKeys = async (user) => {
    try {
      const response = await axios.post('http://localhost:3000/keys/generate', {
        username: user,
      });
      console.log(`Keys generated for ${user}:`, response.data);
    } catch (error) {
      console.error(`Error generating keys for ${user}:`, error);
    }
  };

  const encryptData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/encrypt', {
        username: 'alice',
        plaintext,
      });
      setCiphertext(response.data.ciphertext);
      console.log('Encrypted data:', response.data);
    } catch (error) {
      console.error('Error encrypting data:', error);
    }
  };

  const decryptData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/decrypt', {
        username: 'alice',
        ciphertext,
      });
      console.log('Decrypted data:', response.data);
      setDecryptedMessage(response.data.plaintext);
    } catch (error) {
      console.error('Error decrypting data:', error);
    }
  };

  const reEncryptKeys = async () => {
    try {
      const response = await axios.post('http://localhost:3000/reencryption-key', {
        sender: 'alice',
        recipient: 'bob',
      });
      setReEncryptionKey(response.data.reEncryptionKey);
      console.log('Re-encryption key:', response.data);
    } catch (error) {
      console.error('Error generating re-encryption key:', error);
    }
  };

  const reEncryptData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/reencrypt', {
        ciphertext,
        reEncryptionKey: {
          senderPrivateKeyPem: reEncryptionKey.senderPrivateKeyPem,
          recipientPublicKeyPem: reEncryptionKey.recipientPublicKeyPem,
        },
      });
      console.log('Re-encrypted data:', response.data);
    } catch (error) {
      console.error('Error re-encrypting data:', error);
    }
  };

  const decryptReEncryptedData = async () => {
    try {
      const response = await axios.post('http://localhost:3000/decrypt', {
        username: 'bob',
        ciphertext,
      });
      console.log('Decrypted re-encrypted data:', response.data);
      setDecryptedMessage(response.data.plaintext);
    } catch (error) {
      console.error('Error decrypting re-encrypted data:', error);
    }
  };

  return (
    <div style={{ padding: '10px 20px', borderRadius: '2px', flex: '.5' }}>
      <h1 style={{ fontSize: '18px', fontWeight: '500', marginTop: '10px' }}>
        REENCRYPTION YOUR WATER QUALITY DATA
      </h1>
      <p style={{ fontSize: '12px' }}>
        Encrypt your water quality data before tokenization.
      </p>
      <div>
        <h2>Generate Keys</h2>
        <button onClick={() => generateKeys('alice')}>Generate Keys for Alice</button>
        <button onClick={() => generateKeys('bob')}>Generate Keys for Bob</button>
      </div>
      <div>
        <h2>Encrypt Data</h2>
        <input
          type="text"
          placeholder="Enter plaintext"
          value={plaintext}
          onChange={handleChange(setPlaintext)}
        />
        <button onClick={encryptData}>Encrypt</button>
        <p>Encrypted Ciphertext: {ciphertext}</p>
      </div>

      <div>
        <h2>Decrypt Data</h2>
        <input
          type="text"
          placeholder="Enter ciphertext"
          value={ciphertext}
          onChange={handleChange(setCiphertext)}
        />
        <button onClick={decryptData}>Decrypt</button>
        <p>Decrypted Message: {decryptedMessage}</p>
      </div>

      <div>
        < h2>Re-Encrypt Keys</h2>
        <button onClick={reEncryptKeys}>Generate Re-Encryption Key</button>
        <p>Re-Encryption Key: {JSON.stringify(reEncryptionKey)}</p>
      </div>

      <div>
        <h2>Re-Encrypt Data</h2>
        <button onClick={reEncryptData}>Re-Encrypt Data</button>
      </div>

      <div>
        <h2>Decrypt Re-Encrypted Data</h2>
        <button onClick={decryptReEncryptedData}>Decrypt Re-Encrypted Data</button>
      </div>
    </div>
  );
};

export default Reencryption;