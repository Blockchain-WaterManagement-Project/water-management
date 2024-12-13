// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract WaterNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from user address to their owned token IDs
    mapping(address => uint256[]) private userNFTIds;

    // Mapping from token ID to the owner address
    mapping(uint256 => address) private tokenOwners;

    // Mapping from token ID to its URI
    mapping(uint256 => string) private tokenURIs;

    // Events
    event DataCreated(address indexed owner, uint256 indexed tokenId, string tokenURI);
    event DataUpdated(address indexed owner, uint256 indexed tokenId, string tokenURI);
    event DataDeleted(address indexed owner, uint256 indexed tokenId);
    event NFTRetrieved(address indexed user, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("WaterNFT", "WFT") {}

    // Function creates NFT
    function mintNFT(
        address _owner, 
        string memory _tokenURI
    ) external returns (uint256) {
        // Ensure owner is a valid address
        require(_owner != address(0), "Invalid recipient address: cannot be zero address");
        // Ensure tokenURI is a non-empty string
        require(bytes(_tokenURI).length > 7, "String must be non-zero");  

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(_owner, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        // Store the NFT for the user
        userNFTIds[_owner].push(tokenId);
        tokenURIs[tokenId] = _tokenURI;
        tokenOwners[tokenId] = _owner;

        // Emit the NFTMinted event
        emit DataCreated(_owner, tokenId, _tokenURI);

        return tokenId;
    }

    // Function checks if NFT created
    function isNFTMinted(
        uint256 _tokenId
    ) external view returns (bool) {
        return _exists(_tokenId);
    }

    // Function checks NFT owners match
    function isNFTOwner(
        address _user,
        uint256 _tokenId
    ) internal view returns (bool) {
        return address(tokenOwners[_tokenId]) == _user;
    }

    // Function burns NFT
    function burnNFT(
        uint256 _tokenId
    ) external returns (bool){
        // Ensure only owner can burn NFT
        require(isNFTOwner(msg.sender, _tokenId), "Not approved or owner");
        // Update the token URI for the given NFT ID
        _burn(_tokenId);
        emit DataDeleted(msg.sender, _tokenId);
        return true;
    }

    // Function transfers NFT ownership
    function transferNFT(
        address _to,
        uint256 _tokenId
    ) external returns(bool){
        // Ensure only owner can transfer NFT 
        require(isNFTOwner(msg.sender, _tokenId), "Not approved or owner");
        // Update the token URI for the given NFT ID
        _transfer(msg.sender,_to, _tokenId);
        return true;
    }

    // Function updates NFT content
    function updateNFT(
        uint256 _tokenId, 
        string memory _newTokenURI
    ) external returns(bool){
        // Ensure only owner can update NFT
        require(isNFTOwner(msg.sender, _tokenId), "Not approved or owner");
        // Update the token URI for the given NFT ID
        require(bytes(_newTokenURI).length > 0, "String must be non-zero");
        tokenURIs[_tokenId] = _newTokenURI;
            
        // Emit the NFTRetrieved event
        emit DataUpdated(msg.sender, _tokenId, _newTokenURI);
        return true;
    }

    // Function fetches NFT list for user
    function fetchUserTokens(
        address _user
    ) external view returns (uint256[] memory) {
        return userNFTIds[_user];
    }

    // Function fetches NFT content URI
    function fetchTokenURI(
        uint256 _tokenId
    ) external view returns (string memory) {
        return tokenURIs[_tokenId];
    }

    // Function fetches NFT ownership
    function fetchNFTOwner(
        uint256 _tokenId
    ) public view returns (address) {
        return ownerOf(_tokenId);
    }

    // Override the _burn function to clear the token URI when an NFT is burned
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        // Check if the token exists before trying to clear its URI
        require(_exists(tokenId), "ERC721: URI set of nonexistent token");
        // Call the parent _burn function
        super._burn(tokenId);

        // Clear the token URI only if the token was successfully burned
        if (bytes(tokenURIs[tokenId]).length != 0) {
            delete tokenURIs[tokenId];
        }
    }

    // Override the tokenURI function
    function tokenURI(
        uint256 _tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(_tokenId);
    }

    // Override the supportsInterface function
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}