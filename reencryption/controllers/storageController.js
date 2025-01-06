const { create } = require("ipfs-http-client");

// Connect to IPFS
const node = create({
    protocol: 'http',
    host: '127.0.0.1',
    port: '5001'
});

// Add an item to IPFS
const addItem = async (req, res) => {
    try {
        const body = req.body;
        if (!body.content || !body.path) {
            return res.status(400).json({ error: 'Content and path are required' });
        }

        console.log(body);

        const {cid} = await node.add(JSON.stringify(body));
        res.json({ cid: cid.toString() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add item to IPFS' });
    }
};

// Get an item from IPFS
const getItem = async (req, res) => {
    const { cid } = req.params;
    try {
        const chunks = [];
        for await (const chunk of node.cat(cid)) {
            chunks.push(chunk);
        }
        const fileContent = Buffer.concat(chunks).toString();
        res.json({ content: fileContent });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'File not found' });
    }
};

// List items in a directory on IPFS
const listItems = async (req, res) => {
    const { cid } = req.params;
    try {
        const files = [];
        for await (const file of node.ls(cid)) {
            files.push(file);
        }
        res.json({ files });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: 'Directory not found' });
    }
};

module.exports = {
    addItem,
    getItem,
    listItems,
};