require('dotenv').config();
const express = require('express');
const axios = require('axios');
const Web3 = require('web3');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const contractABI = JSON.parse(process.env.CONTRACT_ABI);
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);
const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

const timeouts = {};

app.post('/startTimeout', (req, res) => {
    const { tokenID, timeoutID } = req.body;
    if (timeouts[timeoutID]) {
        return res.status(400).json({ success: false, message: "Timeout already active" });
    }

    timeouts[timeoutID] = setTimeout(() => {
        callStopTimeout(timeoutID);
    }, 300000); // 5 minutes

    res.json({ success: true, message: 'Timeout started' });
});

async function callStopTimeout(timeoutID) {
    try {
        const gasEstimate = await contract.methods.stopTimeout(timeoutID).estimateGas({ from: account.address });
        const tx = await contract.methods.stopTimeout(timeoutID).send({
            from: account.address,
            gas: gasEstimate
        });
        console.log(`Timeout stopped on-chain: ${tx.transactionHash}`);
    } catch (error) {
        console.error(`Error stopping timeout: ${error}`);
    }
}

app.post('/stopTimeout', (req, res) => {
    const { timeoutID } = req.body;
    if (timeouts[timeoutID]) {
        clearTimeout(timeouts[timeoutID]);
        delete timeouts[timeoutID];
    }
    res.json({ success: true, message: 'Timeout stopped' });
});

app.post('/checkTimeout', (req, res) => {
    const { timeoutID } = req.body;
    res.json({ success: true, isActive: !!timeouts[timeoutID] });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Oracle API running on port ${PORT}`);
});