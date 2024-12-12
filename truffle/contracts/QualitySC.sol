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
    mapping(uint256 => string) public dataStorage;
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
    function addUser (
        address user
    ) external returns (bool) {
        // Ensure the caller is the owner
        require(msg.sender == owner, "Only the owner can add users");

        // Check if the user is already authorized
        require(!authorizedUsers[user], "User   is already authorized");

        // Check if the user is not the zero address
        require(user != address(0), "Cannot add the zero address");

        // Mark the user as authorized
        authorizedUsers[user] = true;

        // Emit an event to signal that the user has been added
        emit UserAdded(user);

        // Return true to indicate that the user addition was successful
        return true;
    }

    // Function to remove a user
    function removeUser (
        address user
    ) external returns (bool) {
        // Ensure the caller is the owner
        require(msg.sender == owner, "Only the owner can remove users");

        // Check if the user is authorized
        require(authorizedUsers[user], "User  is not authorized");

        // Mark the user as unauthorized
        authorizedUsers[user] = false;

        // Emit an event to signal that the user has been removed
        emit UserRemoved(user);

        // Return true to indicate that the user removal was successful
        return true;
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
    ) external returns (bool) {
        // Ensure the caller is an authorized user
        require(authorizedUsers[msg.sender] == true, "User  is not authorized");

        // Optional: Validate the IPFS hash (e.g., check length)
        require(bytes(_tokenURI).length > 0, "IPFS hash cannot be empty");

        // Check if the token ID is already in use
        require(dataOwners[_tokenId] == address(0), "Token ID is already in use");

        // Set the data owner to the caller
        dataOwners[_tokenId] = msg.sender;

        // Store the IPFS hash associated with the token ID
        dataStorage[_tokenId] = _tokenURI;

        // Emit an event to signal that data has been uploaded
        emit DataUploaded(_tokenId, _tokenURI, msg.sender);
        return true;
    }

    // Function to remove data associated with a token ID
    function removeData(
        uint256 _tokenId
    ) external returns (bool) {
        // Ensure the caller is the data owner
        require(msg.sender == dataOwners[_tokenId], "Only the data owner can remove data");

        // Check if the token ID is valid
        require(isDataAdded(_tokenId), "Invalid token ID");

        // Check if the token ID is not already removed
        require(dataOwners[_tokenId] != address(0), "Token ID is already removed");

        // Clear the IPFS hash
        delete dataStorage[_tokenId];

        // Clean up access requests related to the token ID
        for (uint256 i = 0; i < accessRequests[msg.sender].length; i++) {
            if (accessRequests[msg.sender][i].tokenId == _tokenId) {
                // Shift the remaining elements to fill the gap
                for (uint256 j = i; j < accessRequests[msg.sender].length - 1; j++) {
                    accessRequests[msg.sender][j] = accessRequests[msg.sender][j + 1];
                }
                // Remove the last element
                accessRequests[msg.sender].pop();
                break;
            }
        }

        // Clean up data owner mapping
        delete dataOwners[_tokenId];

        emit DataRemoved(_tokenId, msg.sender); // Emit event for data removal
        return true;
    }

    function isDataAdded(
        uint256 _tokenId
    ) public view returns(bool){
        return (dataOwners[_tokenId] != address(0));
    }

    // Function for Data Users to request access
    function requestAccess(
        uint256 _tokenId
    ) external returns (bool) {
        // Check if the token ID is valid
        require(dataOwners[_tokenId] != address(0), "Invalid token ID");

        // Check if the user has already requested access
        for (uint256 i = 0; i < accessRequests[dataOwners[_tokenId]].length; i++) {
            if (accessRequests[dataOwners[_tokenId]][i].requester == msg.sender && accessRequests[dataOwners[_tokenId]][i].tokenId == _tokenId) {
                return false; // Access already requested
            }
        }

        accessRequests[dataOwners[_tokenId]].push(DataRequest(msg.sender, _tokenId, false));
        emit DataAccessRequested(_tokenId, msg.sender);
        return true;
    }

    // Function for Data Owners to grant access
    function grantAccess(
        address _user, 
        uint256 _tokenId
    ) external returns (bool) {
        require(msg.sender == dataOwners[_tokenId], "Only the data owner can grant access");
        for (uint256 i = 0; i < accessRequests[msg.sender].length; i++) {
            if (accessRequests[msg.sender][i].requester == _user && accessRequests[msg.sender][i].tokenId == _tokenId) {
                accessRequests[msg.sender][i].granted = true;
                emit DataAccessGranted(_tokenId, msg.sender, _user);
                return true;
            }
        }
        return false;
    }

    // Function for Data Owners to revoke access
    function revokeAccess(
        address _user, 
        uint256 _tokenId
    ) external returns (bool) {
        require(msg.sender == dataOwners[_tokenId], "Only the data owner can revoke access");
        for (uint256 i = 0; i < accessRequests[msg.sender].length; i++) {
            if (accessRequests[msg.sender][i].requester == _user && accessRequests[msg.sender][i].tokenId == _tokenId) {
                delete accessRequests[msg.sender][i]; // Remove the access request
                emit DataAccessRevoked(_tokenId, _user);
                return true;
            }
        }
        return false;
    }
}