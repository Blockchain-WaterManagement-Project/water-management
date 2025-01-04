const { uploadToIPFS, retrieveFromIPFS } = require('../models/storageModel');

// Upload data to IPFS
async function uploadDataController(req, res) {
    const { data } = req.body;
    try {
        const ipfsHash = await uploadToIPFS(data);
        res.status(201).json({ message: 'Data uploaded to IPFS successfully', ipfsHash });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading data to IPFS', details: error });
    }
}

// Retrieve data from IPFS
async function retrieveDataController(req, res) {
    const { hash } = req.params;
    try {
        const data = await retrieveFromIPFS(hash);
        res.json({ message: 'Data retrieved from IPFS successfully', data });
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving data from IPFS', details: error });
    }
}

module.exports = { uploadDataController, retrieveDataController };