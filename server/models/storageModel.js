const { create } = require('ipfs-http-client');

// Connect to IPFS
const ipfs = create({ url: 'http://localhost:5001' }); // Replace with your IPFS node URL

// Function to upload data to IPFS
async function uploadToIPFS(data) {
    const { path } = await ipfs.add(data);
    return path; // Return the IPFS hash
}

// Function to retrieve data from IPFS
async function retrieveFromIPFS(hash) {
    const stream = ipfs.cat(hash);
    let data = '';

    for await (const chunk of stream) {
        data += chunk.toString(); // Concatenate the data chunks
    }

    return data; // Return the retrieved data
}

module.exports = { uploadToIPFS, retrieveFromIPFS };