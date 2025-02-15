// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

// import "./WaterNFT.sol"; // Import the WaterNFT contract
// import "./OracleSC.sol"; // Import the Oracle contract

contract QualitySC {
    struct DataRequest {
        address requester;
        uint256 tokenId;
        bool granted;
    }

    // Mapping from token ID to data metadata
    mapping(uint256 => string) public dataStorage;
    mapping(address => DataRequest[]) public accessRequests;
    mapping(uint256 => address) public dataOwners; // Token ID to Data Owner
    mapping(address => bool) public authorizedUsers; // Mapping to track authorized users

    // Events from uploaded
    event DataUploaded(uint256 indexed tokenId, string ipfsHash, address indexed owner);
    event UserAdded(address indexed user);
    event UserRemoved(address indexed user);
    event AccessRequested(uint256 indexed tokenId, address indexed receiver);
    event AccessRevoked(uint256 indexed tokenId, address indexed receiver);
    event AccessGranted(uint256 indexed tokenId, address indexed owner, address indexed receiver);
    event DataRemoved(uint256 indexed tokenId, address indexed owner); // New event for data removal

    // Only the contract owner can manage users
    address public owner;

    constructor() {
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
        uint256 tokenId, 
        string memory tokenURI
    ) external returns (bool) {
        // Ensure the caller is an authorized user
        require(authorizedUsers[msg.sender] == true, "User  is not authorized");

        // Optional: Validate the IPFS hash (e.g., check length)
        require(bytes(tokenURI).length > 0, "IPFS hash cannot be empty");

        // Check if the token ID is already in use
        require(dataOwners[tokenId] == address(0), "Token ID is already in use");

        // Set the data owner to the caller
        dataOwners[tokenId] = msg.sender;

        // Store the IPFS hash associated with the token ID
        dataStorage[tokenId] = tokenURI;

        // Emit an event to signal that data has been uploaded
        emit DataUploaded(tokenId, tokenURI, msg.sender);
        return true;
    }

    // Function to remove data associated with a token ID
    function removeData(
        uint256 tokenId
    ) external returns (bool) {
        // Ensure the caller is the data owner
        require(msg.sender == dataOwners[tokenId], "Only the data owner can remove data");

        // Check if the token ID is valid
        require(isDataAdded(tokenId), "Invalid token ID");

        // Check if the token ID is not already removed
        require(dataOwners[tokenId] != address(0), "Token ID is already removed");

        // Clear the IPFS hash
        delete dataStorage[tokenId];

        // Clean up access requests related to the token ID
        for (uint256 i = 0; i < accessRequests[msg.sender].length; i++) {
            if (accessRequests[msg.sender][i].tokenId == tokenId) {
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
        delete dataOwners[tokenId];

        emit DataRemoved(tokenId, msg.sender); // Emit event for data removal
        return true;
    }

    function isDataAdded(
        uint256 tokenId
    ) public view returns(bool){
        return (dataOwners[tokenId] != address(0));
    }

    // Function for Data Users to request access
    function requestAccess(
        uint256 tokenId, 
        uint timePeriod
    ) external returns (bool) {
        // Check if the token ID is valid
        require(dataOwners[tokenId] != address(0), "Only data users with valid address");

        // Check if time period is valid
        require(timePeriod > 0, "Only time period greater than 0");

        // Check if the user has already requested access
        for (uint256 i = 0; i < accessRequests[dataOwners[tokenId]].length; i++) {
            if (accessRequests[dataOwners[tokenId]][i].requester == msg.sender && accessRequests[dataOwners[tokenId]][i].tokenId == tokenId) {
                return false; // Access already requested
            }
        }

        accessRequests[dataOwners[tokenId]].push(DataRequest(msg.sender, tokenId, false));
        emit AccessRequested(tokenId, msg.sender);
        return true;
    }

    // Function for Data Owners to grant access
    function grantAccess(
        address user, 
        uint256 tokenId,
        uint256 accessPeriod
    ) external returns (bool) {
        require(msg.sender == dataOwners[tokenId], "Only the data owner can grant access");
        require(accessPeriod > 0, "Only the access period greater than 0");

        for (uint256 i = 0; i < accessRequests[msg.sender].length; i++) {
            if (accessRequests[msg.sender][i].requester == user && accessRequests[msg.sender][i].tokenId == tokenId) {
                accessRequests[msg.sender][i].granted = true;
                emit AccessGranted(tokenId, msg.sender, user);
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
                emit AccessRevoked(_tokenId, _user);
                return true;
            }
        }
        return false;
    }
}