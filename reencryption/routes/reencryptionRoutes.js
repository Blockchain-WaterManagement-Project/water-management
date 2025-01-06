const express = require("express");
const {
    generateKeys,
    encrypt,
    decrypt,
    generateReEncryptionKey,
    reEncrypt,
} = require("../controllers/reencryptionController");

const router = express.Router();

router.post("/keys/generate", generateKeys);
router.post("/encrypt", encrypt);
router.post("/decrypt", decrypt);
router.post("/reencryption-key", generateReEncryptionKey);
router.post("/reencrypt", reEncrypt);

module.exports = router;