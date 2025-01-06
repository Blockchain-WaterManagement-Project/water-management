const forge = require("node-forge");

// Store keys and encrypted data in memory for demonstration purposes
const userKeys = {};
const encryptedData = {};

// Generate RSA key pair
function generateKeyPair() {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    return {
        privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
        publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
    };
}

// Encrypt data with a public key
function encryptData(publicKeyPem, plaintext) {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(plaintext, "RSA-OAEP", {
        md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
}

// Decrypt data with a private key
function decryptData(privateKeyPem, ciphertext) {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decrypted = privateKey.decrypt(forge.util.decode64(ciphertext), "RSA-OAEP", {
        md: forge.md.sha256.create(),
    });
    return decrypted;
}

// Generate a re-encryption key
function generateReencryptionKey(senderPrivateKeyPem, recipientPublicKeyPem) {
    return { senderPrivateKeyPem, recipientPublicKeyPem };
}

// API Handlers

const generateKeys = (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send({ error: "Username is required" });
    }
    if (userKeys[username]) {
        return res.status(400).send({ error: "User  already exists" });
    }
    const keys = generateKeyPair();
    userKeys[username] = keys;
    res.send({ publicKey: keys.publicKey });
};

const encrypt = (req, res) => {
    const { username, plaintext } = req.body;
    if (!username || !plaintext) {
        return res.status(400).send({ error: "Username and plaintext are required" });
    }
    const user = userKeys[username];
    if (!user) {
        return res.status(404).send({ error: "User  not found" });
    }
    const ciphertext = encryptData(user.publicKey, plaintext);
    encryptedData[username] = ciphertext; // Store encrypted data for demo
    res.send({ ciphertext });
};

const decrypt = (req, res) => {
    const { username, ciphertext } = req.body;
    if (!username || !ciphertext) {
        return res.status(400).send({ error: "Username and ciphertext are required" });
    }
    const user = userKeys[username];
    if (!user) {
        return res.status(404).send({ error: "User  not found" });
    }
    try {
        const plaintext = decryptData(user.privateKey, ciphertext);
        res.send({ plaintext });
    } catch (error) {
        res.status(400).send({ error: "Decryption failed" });
    }
};

const generateReEncryptionKey = (req, res) => {
    const { sender, recipient } = req.body;
    if (!sender || !recipient) {
        return res.status(400).send({ error: "Sender and recipient are required" });
    }

    try {
        const senderPrivateKeyPem = userKeys[sender].privateKey;
        const recipientPublicKeyPem = userKeys[recipient].publicKey;

        res.send({
            reEncryptionKey: {
                senderPrivateKeyPem,
                recipientPublicKeyPem,
            },
        });
    } catch (error) {
        console.error("Error generating re-encryption key:", error);
        res.status(500).send({ error: "Failed to generate re-encryption key" });
    }
};

const reEncrypt = (req, res) => {
    const { ciphertext, reEncryptionKey } = req.body;

    if (!ciphertext || !reEncryptionKey) {
        return res.status(400).send({ error: "Ciphertext and reEncryptionKey are required" });
    }

    const { senderPrivateKeyPem, recipientPublicKeyPem } = reEncryptionKey;
    if (!senderPrivateKeyPem || !recipientPublicKeyPem) {
        return res.status(400).send({ error: "Invalid re-encryption key" });
    }

    try {
        // Decrypt ciphertext with sender's private key
        const senderPrivateKey = forge.pki.privateKeyFromPem(senderPrivateKeyPem);
        const plaintext = senderPrivateKey.decrypt(forge.util.decode64(ciphertext), "RSA-OAEP", {
            md: forge.md.sha256.create(),
        });

        // Re-encrypt plaintext with recipient's public key
        const recipientPublicKey = forge.pki.publicKeyFromPem(recipientPublicKeyPem);
        const reEncryptedCiphertext = recipientPublicKey.encrypt(plaintext, "RSA-OAEP", {
            md: forge.md.sha256.create(),
        });

        res.send({
            reEncryptedCiphertext: forge.util.encode64(reEncryptedCiphertext),
        });
    } catch (error) {
        console.error("Re-encryption error:", error);
        res.status(500).send({ error: "Failed to re-encrypt ciphertext" });
    }
};

module.exports = {
    generateKeys,
    encrypt,
    decrypt,
    generateReEncryptionKey,
    reEncrypt,
};