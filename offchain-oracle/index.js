const Web3 = require('web3').default;
const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

// Initialize web3 and set up the contract
const web3 = new Web3('http://localhost:7545');
const oracleContractAddress = 'YOUR_ORACLE_CONTRACT_ADDRESS';
const oracleABI = require('./oracleABI.json'); // ABI of the Oracle contract
const oracleContract = new web3.eth.Contract(oracleABI, oracleContractAddress);

// Listen for the ProcessClockStarted event
oracleContract.events.ProcessClockStarted()
    .on('data', async (event) => {
        const { user, tokenId, timeInSeconds } = event.returnValues;

        // Generate a unique ID for this transaction
        const uniqueId = uuidv4();

        // Prepare the data to send to the API
        const data = {
            user,
            tokenId,
            uniqueId, // Use the generated unique ID
            timeInSeconds
        };

        // Make an API call to your offchain service
        try {
            const response = await axios.post('YOUR_API_ENDPOINT', data);
            console.log('API Response:', response.data);
        } catch (error) {
            console.error('Error calling API:', error);
        }
    })
    .on('error', (error) => {
        console.error('Error in event listener:', error);
});