const express = require('express');
const { 
    generateKeys,
    encryptForSelf,
    reEncryptData,
    decryptForSelf,
    decryptReEncryptedData,
 } = require('./../controllers/userController');

const router = express.Router();

// Route to generate keys for a user
router.post('/generate-keys', generateKeys);

// Route to encrypt data for themselves
router.post('/encrypt-for-self', encryptForSelf);

// Route to re-encrypt data for another user
router.post('/re-encrypt-data', reEncryptData);

// Route to decrypt data for themselves
router.post('/decrypt-for-self', decryptForSelf);

// Route to decrypt re-encrypted data for another user
router.post('/decrypt-re-encrypted-data', decryptReEncryptedData);

module.exports = router;