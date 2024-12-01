// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract WaterNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // Mapping from user address to their owned token IDs
    mapping(address => uint256[]) private userNFTIds;

    // Mapping from token ID to its URI
    mapping(uint256 => string) private tokenURIs;

    // Events
    event NFTMinted(address indexed owner, uint256 indexed tokenId, string tokenURI);
    event NFTRetrieved(address indexed user, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("WaterNFT", "WFT") {}

    function mintNFT(
        address _owner, 
        string memory _tokenURI
    ) external returns (uint256) {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(_owner, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        // Store the NFT for the user
        userNFTIds[_owner].push(tokenId);
        tokenURIs[tokenId] = _tokenURI;

        // Emit the NFTMinted event
        emit NFTMinted(_owner, tokenId, _tokenURI);

        return tokenId;
    }

    // Function checks NFTs for the user
    function getUserNFTs(address _user) external view returns (uint256[] memory) {
        return userNFTIds[_user];
    }

    // Function fetches NFT data for
    function getNFTData(uint256 _tokenId) external returns (string memory) {
        string memory _tokenURI = tokenURIs[_tokenId];
        
        // Emit the NFTRetrieved event
        emit NFTRetrieved(msg.sender, _tokenId, _tokenURI);

        return _tokenURI;
    }

    // Function checks if token has already been minted
    function isMinted(uint256 _tokenId) external view returns (bool) {
        return _exists(_tokenId);
    }

    // Override the _burn function to clear the token URI when an NFT is burned
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        _setTokenURI(tokenId, "");
    }

    // Override the supportsInterface function
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Override the tokenURI function
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}