const express = require('express');
const router = express.Router();
const { uploadDataController, retrieveDataController } = require('../controllers/storageController');

// Route to upload data to IPFS
router.post('/upload', uploadDataController);

// Route to retrieve data from IPFS
router.get('/retrieve/:hash', retrieveDataController);

module.exports = router;