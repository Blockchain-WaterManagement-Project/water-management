const forge = require("node-forge");
const User = require('./../model/userModel');

// Generate RSA key pair
function generateKeyPair() {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
    return {
        privateKey: forge.pki.privateKeyToPem(keypair.privateKey),
        publicKey: forge.pki.publicKeyToPem(keypair.publicKey),
    };
}

// API Handlers
const generateKeys = async (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).send({ error: "Username is required" });
    }

    try {
        const existingUser  = await User.findOne({ where: { username } });
        if (existingUser ) {
            return res.status(400).send({ error: "User  already exists" });
        }

        const keys = generateKeyPair();
        const user = await User.create({
            username,
            publicKey: keys.publicKey,
            privateKey: keys.privateKey,
        });

        res.send({ publicKey: user.publicKey });
    } catch (error) {
        console.error("Error generating keys:", error);
        res.status(500).send({ error: "Failed to generate keys" });
    }
};

// Encrypt data for themselves
const encryptForSelf = async (req, res) => {
    const { username, plaintext } = req.body;
    if (!username || !plaintext) {
        return res.status(400).send({ error: "Username and plaintext are required" });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).send({ error: "User  not found" });
        }

        const ciphertext = encryptData(user.publicKey, plaintext);
        res.send({ ciphertext });
    } catch (error) {
        console.error("Error encrypting data:", error);
        res.status(500).send({ error: "Failed to encrypt data" });
    }
};

// Re-encrypt data for another user
const reEncryptData = async (req, res) => {
    const { senderUsername, recipientUsername, ciphertext } = req.body;
    if (!senderUsername || !recipientUsername || !ciphertext) {
        return res.status(400).send({ error: "Sender, recipient, and ciphertext are required" });
    }

    try {
        const sender = await User.findOne({ where: { username: senderUsername } });
        const recipient = await User.findOne({ where: { username: recipientUsername } });

        if (!sender || !recipient) {
            return res.status(404).send({ error: "Sender or recipient not found" });
        }

        // Decrypt the ciphertext with the sender's private key
        const plaintext = decryptData(sender.privateKey, ciphertext);

        // Re-encrypt the plaintext with the recipient's public key
        const reEncryptedCiphertext = encryptData(recipient.publicKey, plaintext);

        res.send({ reEncryptedCiphertext });
    } catch (error) {
        console.error("Error re-encrypting data:", error);
        res.status(500).send({ error: "Failed to re-encrypt data" });
    }
};

// Decrypt data for themselves
const decryptForSelf = async (req, res) => {
    const { username, ciphertext } = req.body;
    if (!username || !ciphertext) {
        return res.status(400).send({ error: "Username and ciphertext are required" });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).send({ error: "User  not found" });
        }

        const plaintext = decryptData(user.privateKey, ciphertext);
        res.send({ plaintext });
    } catch (error) {
        console.error("Error decrypting data:", error);
        res.status(500).send({ error: "Failed to decrypt data" });
    }
};

// Decrypt re-encrypted data for another user
const decryptReEncryptedData = async (req, res) => {
    const { username, reEncryptedCiphertext } = req.body;
    if (!username || !reEncryptedCiphertext) {
        return res.status(400).send({ error: "Username and re-encrypted ciphertext are required" });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).send({ error: "User  not found" });
        }

        // Decrypt the re-encrypted ciphertext with the user's private key
        const plaintext = decryptData(user.privateKey, reEncryptedCiphertext);
        res.send({ plaintext });
    } catch (error) {
        console.error("Error decrypting re-encrypted data:", error);
        res.status(500).send({ error: "Failed to decrypt re-encrypted data" });
    }
};

// Helper functions for encryption and decryption
function encryptData(publicKeyPem, plaintext) {
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
    const encrypted = publicKey.encrypt(plaintext, "RSA-OAEP", {
        md: forge.md.sha256.create(),
    });
    return forge.util.encode64(encrypted);
}

function decryptData(privateKeyPem, ciphertext) {
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem);
    const decodedCiphertext = forge.util.decode64(ciphertext);
    const decrypted = privateKey.decrypt(decodedCiphertext, "RSA-OAEP", {
        md: forge.md.sha256.create(),
    });
    return decrypted;
}

module.exports = {
    generateKeys,
    encryptForSelf,
    reEncryptData,
    decryptForSelf,
    decryptReEncryptedData,
};