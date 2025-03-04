# Blockchain-Based Water Management System

This project comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.

Run the `unbox` command using 1 of 2 ways.

```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
```

### Start User Interface using react dev server.

```sh
$ cd client
$ npm run build
$ npm run start
```

Our application features a user-friendly graphical interface built with React, designed to facilitate seamless interaction with our smart contracts. Key aspects of the interface include:

- **Intuitive Navigation**: Users can easily navigate through various functionalities, ensuring a smooth experience.
- **Core Functionalities**:
  - **Minting Digital Assets**: Users can create unique water-related digital assets through the WaterNFT contract.
  - **Verifying Water Quality**: The QualitySC contract allows users to track and verify water quality metrics.
  - **Accessing Real-Time Data**: OracleSC provides users with real-time data feeds to enhance decision-making.
- **Step-by-Step Guidance**: The React app offers clear instructions for connecting with the underlying smart contracts, making calls, and sending transactions effortlessly.
- **User  Engagement**: The interface simplifies complex blockchain interactions, making it accessible to both technical and non-technical users.


### Start Smart Contract using truffle environment.

```sh
$ cd truffle
$ truffle console
$ console > compile
$ console > migrate
```

The backbone of our application lies in the robust smart contracts developed using Solidity within the Truffle environment. Here’s an overview of the development process:

- **Contract Overview**:
  - **WaterNFT**: Manages the creation and ownership of unique digital assets.
  - **QualitySC**: Ensures the integrity and tracking of water quality data.
  - **OracleSC**: Integrates real-time external data feeds to enrich application functionality.
  
- **Truffle Framework**:
  - **Comprehensive Toolset**: Truffle provides a suite of tools for writing, testing, and deploying smart contracts.
  - **Efficient Management**: Developers can easily manage contract migrations and run automated tests to ensure security and reliability.
  
- **Development Benefits**:
  - **Well-Structured Contracts**: Each contract is designed with specific functionalities to meet user needs.
  - **Thorough Testing**: Automated tests ensure that contracts are secure and function as intended.
  - **Ready for Deployment**: Leveraging Truffle’s capabilities ensures that our smart contracts are prepared for deployment on the Ethereum blockchain.

## FAQ

- __How do I use this with Ganache (or any other network)?__
- __How do I contribute to the project?

