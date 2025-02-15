// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

interface IQualitySC {
    function grantAccess(address user, uint256 tokenId, uint256 accessPeriod) external;
}

interface IWaterNFT {
    function fetchTokenURI(uint256 tokenId) external view returns (string memory);
    function updateNFT(uint256 tokenId, string memory newTokenURI) external;
}

contract OracleSC {
    struct Metadata {
        string tokenURI;
        address owner;
        mapping(address => bytes) users; // mapping of users to their re-encrypted data
    }

    mapping(uint256 => Metadata) public metadataMapping; // Mapping from tokenID to Metadata
    mapping(address => uint256) public accessExpiry; // Access expiry tracking
    address public qualitySCAddress;
    address public waterNFTAddress;

    event AccessGranted(address indexed user, uint256 tokenId, uint256 accessPeriod, uint256 timestamp);
    event MetadataUpdated(uint256 tokenId, string tokenURI, uint256 timestamp);
    event CountdownStarted(uint256 tokenId, address indexed user, uint256 duration, uint256 timestamp);
    event AccessTimeUp(uint256 tokenId, address indexed user, uint256 timestamp);

    modifier onlyOwner(uint256 tokenId) {
        require(msg.sender == metadataMapping[tokenId].owner, "Not the owner");
        _;
    }

    constructor(address _qualitySCAddress, address _waterNFTAddress) {
        qualitySCAddress = _qualitySCAddress;
        waterNFTAddress = _waterNFTAddress;
    }

    // Called by QualitySC to initiate the time-sharing request
    function processTimeSharing(uint256 tokenId, address user, uint256 accessPeriod) public {
        // Emit event for access initiation
        emit AccessGranted(user, tokenId, accessPeriod, block.timestamp);

        // Grant access using QualitySC contract
        IQualitySC(qualitySCAddress).grantAccess(user, tokenId, accessPeriod);

        // Start countdown timer for access
        startCountdown(tokenId, user, accessPeriod);
    }

    // Start countdown for the user
    function startCountdown(uint256 tokenId, address user, uint256 duration) public onlyOwner(tokenId) {
        accessExpiry[user] = block.timestamp + duration;
        emit CountdownStarted(tokenId, user, duration, block.timestamp);
    }

    // Check if the user's access time has expired
    function checkAccessExpiration(address user) public view returns (bool) {
        return block.timestamp >= accessExpiry[user];
    }

    // Function to handle access time expiration
    function accessTimeUp(uint256 tokenId, address user) public onlyOwner(tokenId) {
        require(block.timestamp >= accessExpiry[user], "Access time has not expired yet");

        // Nullify user's access in metadata
        metadataMapping[tokenId].users[user] = "";
        string memory newTokenURI = metadataMapping[tokenId].tokenURI; // Retrieve tokenURI
        IWaterNFT(waterNFTAddress).updateNFT(tokenId, newTokenURI); // Update the NFT with the new metadata

        emit AccessTimeUp(tokenId, user, block.timestamp);
    }

    // Function to update NFT metadata after data is re-encrypted
    function updateNFT(uint256 tokenId, string memory newTokenURI) public onlyOwner(tokenId) {
        metadataMapping[tokenId].tokenURI = newTokenURI;
        emit MetadataUpdated(tokenId, newTokenURI, block.timestamp);
    }
}