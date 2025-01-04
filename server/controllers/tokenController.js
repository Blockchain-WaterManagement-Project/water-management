const { NFT } = require('../models/tokenModel');

// Mint NFT
async function mintNFT(req, res) {
    const { tokenData } = req.body;
    try {
        const nft = await NFT.create({ tokenData });
        res.status(201).json({ message: 'NFT minted successfully', nft });
    } catch (error) {
        res.status(500).json({ error: 'Error minting NFT', details: error });
    }
}

// Update NFT
async function updateNFT(req, res) {
    const { id } = req.params;
    const { updatedData } = req.body;
    try {
        const nft = await NFT.findByPk(id);
        if (!nft) {
            return res.status(404).json({ error: 'NFT not found' });
        }
        nft.tokenData = updatedData;
        await nft.save();
        res.json({ message: `NFT with ID ${id} updated successfully`, nft });
    } catch (error) {
        res.status(500).json({ error: 'Error updating NFT', details: error });
    }
}

module.exports = { mintNFT, updateNFT };