// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts@4.7.3/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.7.3/utils/Counters.sol";
import "@openzeppelin/contracts@4.7.3/token/ERC721/extensions/ERC721URIStorage.sol";

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

    // Function creates token
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

    // Function checks if token has already been minted
    function isTokenExisting(
        uint256 _tokenId
    ) external view returns (bool) {
        return _exists(_tokenId);
    }

    // Function delete token
    function deleteToken(
        uint256 _tokenId
    ) external returns (bool){
        require(_isApprovedOrOwner(msg.sender, _tokenId), "Not approved or owner");
        
        // Update the token URI for the given NFT ID
        _burn(_tokenId);
        return true;
    }

    // Function transfers token ownership
    function transferToken(
        address _to,
        uint256 _tokenId
    ) external returns(bool){
        require(_isApprovedOrOwner(msg.sender, _tokenId), "Not approved or owner");
        
        // Update the token URI for the given NFT ID
        _transfer(msg.sender,_to, _tokenId);
    
        return true;
    }

    // Function updates token content
    function updateTokenURI(
        uint256 _tokenId, 
        string memory _newTokenURI
    ) external returns(bool){
        require(_isApprovedOrOwner(msg.sender, _tokenId), "Not approved or owner"); 
        
        // Update the token URI for the given NFT ID
        require(bytes(_newTokenURI).length > 0, "String must be non-zero");
        tokenURIs[_tokenId] = _newTokenURI;
            
        // Emit the NFTRetrieved event
        emit NFTRetrieved(msg.sender, _tokenId, _newTokenURI);
        return true;
    }

    // Function checks NFTs for the user
    function fetchUserTokens(
        address _user
    ) external view returns (uint256[] memory) {
        return userNFTIds[_user];
    }

    // Function fetches NFT data for
    function fetchTokenURI(
        uint256 _tokenId
    ) external view returns (string memory) {
        return tokenURIs[_tokenId];
    }

    // Override the _burn function to clear the token URI when an NFT is burned
    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
        _setTokenURI(tokenId, "");
    }

    // Override the tokenURI function
    function tokenURI(
        uint256 _tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(_tokenId);
    }
}