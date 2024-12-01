// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "./WaterNFT.sol"; // Import the WaterNFT contract
import "./OracleSC.sol"; // Import the Oracle contract

contract QualitySC {
    struct DataRequest {
        address requester;
        uint256 tokenId;
        bool granted;
    }

    WaterNFT public waterNFT; // Instance of the WaterNFT contract
    OracleSC public oracleSC; // Instance of the Oracle contract

    // Mapping from token ID to data metadata
    mapping(uint256 => string) public dataIPFS;
    mapping(address => DataRequest[]) public accessRequests;
    mapping(uint256 => address) public dataOwners; // Token ID to Data Owner
    mapping(address => bool) public authorizedUsers; // Mapping to track authorized users

    // Events from uploaded
    event DataUploaded(uint256 indexed tokenId, string ipfsHash, address indexed owner);
    event UserAdded(address indexed user);
    event UserRemoved(address indexed user);
    event DataAccessRequested(uint256 indexed tokenId, address indexed receiver);
    event DataAccessRevoked(uint256 indexed tokenId, address indexed receiver);
    event DataAccessGranted(uint256 indexed tokenId, address indexed owner, address indexed receiver);
    event DataRemoved(uint256 indexed tokenId, address indexed owner); // New event for data removal

    // Only the contract owner can manage users
    address public owner;

    constructor(
        address _waterNFTAddress, 
        address _oracleAddress
    ) {
        waterNFT = WaterNFT(_waterNFTAddress); // Initialize the WaterNFT contract
        oracleSC = OracleSC(_oracleAddress); // Initialize the Oracle contract
        owner = msg.sender; // Set the contract deployer as the owner
    }

    // Function to add a user
    function addUser  (
        address user
    ) external {
        require(msg.sender == owner, "Only the owner can add users");
        require(!authorizedUsers[user], "User  is already authorized");

        authorizedUsers[user] = true; // Mark the user as authorized
        emit UserAdded(user); // Emit event for user addition
    }

    // Function to remove a user
    function removeUser  (
        address user
    ) external {
        require(msg.sender == owner, "Only the owner can remove users");
        require(authorizedUsers[user], "User  is not authorized");

        authorizedUsers[user] = false; // Mark the user as unauthorized
        emit UserRemoved(user); // Emit event for user removal
    }

    // Function to check if a user is authorized
    function isUserAuthorized(
        address user
    ) external view returns (bool) {
        return authorizedUsers[user];
    }

    // Function to upload data and mint a token
    function addData(
        uint256 _tokenId, 
        string memory _tokenURI
    ) external {
        // Ensure the caller is an authorized user
        require(authorizedUsers[msg.sender], "User  is not authorized");
        
        // Optional: Validate the IPFS hash (e.g., check length)
        require(bytes(_tokenURI).length > 0, "IPFS hash cannot be empty");

        // Set the data owner to the caller
        dataOwners[_tokenId] = msg.sender; // Set the data owner to the caller

        // Store the IPFS hash associated with the token ID
        dataIPFS[_tokenId] = _tokenURI;

        // Emit an event to signal that data has been uploaded
        emit DataUploaded(_tokenId, _tokenURI, msg.sender);
    }

    // Function to remove data associated with a token ID
    function removeData(
        uint256 _tokenId
    ) external {
        require(msg.sender == dataOwners[_tokenId], "Only the data owner can remove data");
        
        // Clear the IPFS hash
        delete dataIPFS[_tokenId];

        // Clean up access requests related to the token ID
        for (uint256 i = 0; i < accessRequests[msg.sender].length; i++) {
            if (accessRequests[msg.sender][i].tokenId == _tokenId) {
                delete accessRequests[msg.sender][i]; // Remove the access request
            }
        }

        emit DataRemoved(_tokenId, msg.sender); // Emit event for data removal
    }

    // Function for Data Users to request access
    function requestAccess(
        uint256 _tokenId
    ) external {
        accessRequests[dataOwners[_tokenId]].push(DataRequest(msg.sender, _tokenId, false));
        emit DataAccessRequested(_tokenId, msg.sender);
    }

    // Function for Data Owners to grant access
    function grantAccess(
        address _user, 
        uint256 _tokenId
    ) external {
        require(msg.sender == dataOwners[_tokenId], "Only the data owner can grant access");
        for (uint256 i = 0; i < accessRequests[msg.sender].length; i++) {
            if (accessRequests[msg.sender][i].requester == _user && accessRequests [msg.sender][i].tokenId == _tokenId) {
                accessRequests[msg.sender][i].granted = true;
                emit DataAccessGranted(_tokenId, msg.sender, _user);
                break;
            }
        }
    }

    // Function for Data Owners to revoke access
    function revokeAccess(
        address _user, 
        uint256 _tokenId
    ) external {
        require(msg.sender == dataOwners[_tokenId], "Only the data owner can revoke access");
        for (uint256 i = 0; i < accessRequests[msg.sender].length; i++) {
            if (accessRequests[msg.sender][i].requester == _user && accessRequests[msg.sender][i].tokenId == _tokenId) {
                delete accessRequests[msg.sender][i]; // Remove the access request
                emit DataAccessRevoked(_tokenId, _user);
                break;
            }
        }
    }

    // Function to verify content using the Oracle
    function contentVerification(
        uint256 _tokenId
    ) external view {
        require(accessRequests[dataOwners[_tokenId]].length > 0, "No access requests found");
        string memory ipfsUrl = dataIPFS[_tokenId];
        oracleSC.verifyData(_tokenId, ipfsUrl); // Call to Oracle's verifyData function
    }

    // Function to retrieve the agreed value from the Oracle contract
    function getAgreedValue(
        uint256 _tokenId
    ) external view returns (string memory) {
        return oracleSC.getAgreedValue(_tokenId);
    }
}