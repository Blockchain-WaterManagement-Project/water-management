require("dotenv").config();

import Web3 from "web3";


const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER_ADDRESS));
const abi = JSON.parse(process.env.ABI);
const address = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(abi, address);

const account = () => {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((err, accounts) => {
      if (err === null) {
        resolve(accounts[process.env.ACCOUNT_NUMBER]);
      } else {
        reject(err);
      }
    });
  });
};

export const createRequest = ({
  urlToQuery,
  attributeToFetch
}) => {
  return new Promise((resolve, reject) => {
    account().then(account => {
      contract.createRequest(urlToQuery, attributeToFetch, {
        from: account,
        gas: 60000000
      }, (err, res) => {
        if (err === null) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    }).catch(error => reject(error));
  });
};

export const updateRequest = ({
  id,
  valueRetrieved
}) => {
  return new Promise((resolve, reject) => {
    account().then(account => {
      contract.updateRequest(id, valueRetrieved, {
        from: account,
        gas: 60000000
      }, (err, res) => {
        if (err === null) {
          resolve(res);
        } else {
          reject(err);
        }
      });
    }).catch(error => reject(error));
  });
};

// Listen for new requests
export const newRequest = ((error, event) => {
  if (error) {
    console.error('Error listening for new requests:', error);
  } else {
    // Extracting the relevant data from the event
    const { transactionHash, blockNumber, args } = event;
    const [requester, urlToQuery, attributeToFetch] = args;

    console.log('New request event received:');
    console.log('Transaction Hash:', transactionHash);
    console.log('Block Number:', blockNumber);
    console.log('Requester:', requester);
    console.log('URL to Query:', urlToQuery);
    console.log('Attribute to Fetch:', attributeToFetch);
  }
});


export const updatedRequest = ((error, event) => {
  if (error) {
    console.error('Error listening for new requests:', error);
  } else {
    // Extracting the relevant data from the event
    const { transactionHash, blockNumber, args } = event;
    const [requester, urlToQuery, attributeToFetch] = args;

    console.log('Update request event received:');
    console.log('Transaction Hash:', transactionHash);
    console.log('Block Number:', blockNumber);
    console.log('Requester:', requester);
    console.log('URL to Query:', urlToQuery);
    console.log('Attribute to Fetch:', attributeToFetch);
  }
});

// Listen for updated requests
// // export const updatedRequest = (callback) => {
// //   contract.events.UpdatedRequest()
// //     .on('data', (event) => callback(null, event))
// //     .on('error', (error) => callback(error));
// // };