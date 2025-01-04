const Web3 = require('web3').default;

// Web3 setup
const web3 = new Web3('http://localhost:8545');

// Smart contract addresses
const waterNFTAddress = '0xYourWaterNFTContractAddress';
const qualitySCAddress = '0xYourQualitySCContractAddress';

// ABI for the smart contracts (replace with your actual ABI)
const waterNFTABI = [ /* WaterNFT ABI */ ];
const qualitySCABI = [ /* QualitySC ABI */ ];

const waterNFTContract = new web3.eth.Contract(waterNFTABI, waterNFTAddress);
const qualitySCContract = new web3.eth.Contract(qualitySCABI, qualitySCAddress);

module.exports = { waterNFTContract, qualitySCContract };