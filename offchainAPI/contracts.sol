// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

interface IWaterNFT {
    function updateNFT(uint256 _tokenID, string memory tokenURI) external returns (bool);
}

contract OracleSC {
    address public waterNFT;
    mapping(uint256 => uint256) public timeoutIDs;

    event MetadataUpdated(uint256 tokenID, string newTokenURI);
    event MetadataRemoved(uint256 tokenID);
    event ProcessClockStarted(uint256 tokenID, uint256 timeoutID, uint256 timeInSeconds);
    event ProcessClockStopped(uint256 tokenID);
    event TokenStateVerified(uint256 tokenID, bool state);

    constructor(address _waterNFT) {
        waterNFT = _waterNFT;
    }

    function verifyTokenState(uint256 tokenID, string memory tokenURI) external returns (bool) {
        // Call off-chain API to verify token state
        // The off-chain API calculates WEC and returns true or false
        // The Oracle is responsible for the actual request and WEC calculation
        emit TokenStateVerified(tokenID, true);
        return true;
    }

    function startTimeout(uint256 tokenID, uint256 timeoutID) external {
        require(timeoutIDs[tokenID] == 0, "Timeout already active");
        timeoutIDs[tokenID] = timeoutID;
        emit ProcessClockStarted(tokenID, timeoutID, 300);
    }

    function stopTimeout(uint256 timeoutID) external {
        require(timeoutID != 0, "Invalid timeoutID");
        uint256 tokenID;
        
        // Find tokenID associated with this timeoutID
        for (uint256 id = 1; id <= 1000; id++) {
            if (timeoutIDs[id] == timeoutID) {
                tokenID = id;
                break;
            }
        }
        
        require(tokenID != 0, "TimeoutID not found");
        
        timeoutIDs[tokenID] = 0;
        emit ProcessClockStopped(tokenID);

        // Call removeTokenMetadata after timeout
        removeTokenMetadata(tokenID);
    }

    function checkTimeout(uint256 timeoutID) public view returns (bool) {
        uint256 tokenID;
        for (uint256 id = 1; id <= 1000; id++) {
            if (timeoutIDs[id] == timeoutID) {
                tokenID = id;
                break;
            }
        }
        
        return tokenID != 0;
    }

    function updateTokenMetadata1(
        uint256 tokenID, 
        address tokenDU, 
        string memory tokenURI
    ) external returns (bool) {
        // Trigger off-chain API to update metadata and get new CID
        string memory newCID = "new-ipfs-cid"; // This would come from off-chain

        IWaterNFT nft = IWaterNFT(waterNFT);
        bool updated = nft.updateNFT(tokenID, newCID);
        require(updated, "WaterNFT update failed");

        uint256 timeoutID = uint256(keccak256(abi.encodePacked(tokenID, tokenDU, block.timestamp)));
        timeoutIDs[tokenID] = timeoutID;

        // Start timeout via off-chain API
        emit ProcessClockStarted(tokenID, timeoutID, 300);
        return true;
    }

    function updateTokenMetadata(
        uint256 tokenID, 
        address tokenDU, 
        string memory tokenURI
    ) external returns (bool) {
        // Call off-chain API to update metadata
        bytes memory payload = abi.encodeWithSignature(
            "updateMetadata(uint256,address,string)", 
            tokenID, 
            tokenDU, 
            tokenURI
        );

        (bool success, bytes memory response) = address(this).call(payload);
        require(success, "API call failed");
        
        // Extract CID from response
        string memory CID = abi.decode(response, (string));

        // Update WaterNFT contract with the new CID
        IWaterNFT nft = IWaterNFT(waterNFT);
        bool updated = nft.updateNFT(tokenID, CID);
        require(updated, "WaterNFT update failed");

        // Start timeout for metadata removal
        uint256 timeoutID = uint256(keccak256(abi.encodePacked(tokenID, tokenDU, block.timestamp)));
        timeoutIDs[tokenID] = timeoutID;

        // Start timeout via off-chain API
        emit ProcessClockStarted(tokenID, timeoutID, 300);
        return true;
    }

    function removeTokenMetadata1(uint256 tokenID) private returns (bool) {
        // Trigger off-chain API to remove metadata and get new CID
        string memory newCID = "updated-ipfs-cid"; // This would come from off-chain

        IWaterNFT nft = IWaterNFT(waterNFT);
        bool updated = nft.updateNFT(tokenID, newCID);
        require(updated, "WaterNFT update failed");

        emit MetadataRemoved(tokenID);
        return true;
    }

    function removeTokenMetadata(
        uint256 tokenID, 
        address tokenDU, 
        string memory tokenURI
    ) external returns (bool) {
        // Call off-chain API to remove metadata
        bytes memory payload = abi.encodeWithSignature(
            "removeTokenMetadata(uint256,address,string)", 
            tokenID, 
            tokenDU, 
            tokenURI
        );

        (bool success, bytes memory response) = address(this).call(payload);
        require(success, "API call failed");

        // Extract updated CID from response
        string memory CID = abi.decode(response, (string));

        // Update WaterNFT contract with the new CID
        IWaterNFT nft = IWaterNFT(waterNFT);
        bool updated = nft.updateNFT(tokenID, CID);
        require(updated, "WaterNFT update failed");

        emit MetadataRemoved(tokenID);
        return true;
    }
}

interface IQualitySC {
    function registerNFT(
        uint256 _tokenId,
        address _tokenOwner,
        string memory _tokenUrl
    )external returns(bool);
}

contract WaterNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address QualityAddress = 0x417Bf7C9dc415FEEb693B6FE313d1186C692600F;
    IQualitySC QualitySC = IQualitySC(QualityAddress);

    // Mapping from user address to their owned token IDs
    mapping(address => uint256[]) private userNFTIds;

    // Mapping from token ID to the owner address
    mapping(uint256 => address) private tokenOwners;

    // Mapping from token ID to its URI
    mapping(uint256 => string) public tokenURIs;
    uint256[] private allTokenIds;

    // Events
    event DataCreated(address indexed owner, uint256 indexed tokenId, string tokenURI);
    event DataUpdated(address indexed owner, uint256 indexed tokenId, string tokenURI);
    event DataDeleted(address indexed owner, uint256 indexed tokenId);
    event NFTRetrieved(address indexed user, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("WaterNFT", "WFT") {}

    // Function creates NFT
    function mintNFT(
        address owner, 
        string memory newTokenURI
    ) external returns (uint256) {
        // Ensure owner is a valid address
        require(owner != address(0), "Invalid recipient address: cannot be zero address");
        // Ensure tokenURI is a non-empty string
        require(bytes(newTokenURI).length > 7, "String must be non-zero");  

        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(owner, tokenId);
        _setTokenURI(tokenId, newTokenURI);
        QualitySC.registerNFT(tokenId, owner, newTokenURI);

        // Store the NFT for the user
        userNFTIds[owner].push(tokenId);
        tokenURIs[tokenId] = newTokenURI;
        tokenOwners[tokenId] = owner;
        // Store the tokenId in the allTokenIds array
        allTokenIds.push(tokenId);

        // Emit the NFTMinted event
        emit DataCreated(owner, tokenId, newTokenURI);

        return tokenId;
    }

    // Function checks if NFT created
    function isNFTMinted(
        uint256 tokenId
    ) external view returns (bool) {
        return _exists(tokenId);
    }

    // Function checks NFT owners match
    function isNFTOwner(
        address user,
        uint256 tokenId
    ) internal view returns (bool) {
        return address(tokenOwners[tokenId]) == user;
    }

    // Function burns NFT
    function burnNFT(
        uint256 tokenId
    ) external returns (bool){
        // Ensure only owner can burn NFT
        require(isNFTOwner(msg.sender, tokenId), "Not approved or owner");
        // Update the token URI for the given NFT ID
        _burn(tokenId);
        emit DataDeleted(msg.sender, tokenId);
        return true;
    }

    // Function transfers NFT ownership
    function transferNFT(
        address to,
        uint256 tokenId
    ) external returns(bool){
        // Ensure only owner can transfer NFT 
        require(isNFTOwner(msg.sender, tokenId), "Not approved or owner");
        // Update the token URI for the given NFT ID
        _transfer(msg.sender,to, tokenId);
        return true;
    }

    // Function updates NFT content
    function updateNFT(
        uint256 tokenId, 
        string memory newTokenURI
    ) external returns(bool){
        // Ensure only owner can update NFT
        require(isNFTOwner(msg.sender, tokenId), "Not approved or owner");
        // Update the token URI for the given NFT ID
        require(bytes(newTokenURI).length > 0, "String must be non-zero");
        tokenURIs[tokenId] = newTokenURI;
            
        // Emit the NFTRetrieved event
        emit DataUpdated(msg.sender, tokenId, newTokenURI);
        return true;
    }

    // Function fetches NFT list for user
    function fetchUserTokens(
        address user
    ) external view returns (uint256[] memory) {
        return userNFTIds[user];
    }

    // Function fetches NFT content URI
    function fetchTokenURI(
        uint256 tokenId
    ) external view returns (string memory) {
        return tokenURIs[tokenId];
    }

    // Function fetches NFT ownership
    function fetchTokenDO(
        uint256 tokenId
    ) public view returns (address) {
        return ownerOf(tokenId);
    }

    function fetchAllTokenIds() external view returns (uint256[] memory) {
        return allTokenIds;
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
        uint256 newTokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        require(_exists(newTokenId), "Token ID does not exist!");
        return super.tokenURI(newTokenId);
    }

    // Override the supportsInterface function
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

contract QualitySC {
    struct TokenNFT{
        uint256 tokenID;
        address tokenOwner;
        string tokenURL;
    }

    struct TokenAccess{
        uint256 tokenID;
        address user;
        uint256 period;
        bool status;
    }

    // Variables
    address public owner;
    uint256 public tokenCount;

    // Mappings
    mapping(address => TokenNFT) public TokenList;
    mapping(address => TokenAccess) public TokenAccessStatus;
    mapping(uint256 => bool) public tokenExists;

    // Events
    event TokenRegisterEvent(uint256 tokenID, address indexed tokenOwner, string tokenURI);
    event TokenAccessGrantEvent(uint256 tokenID, address indexed tokenUser, uint256 period);
    event TokenAccessRevokeEvent(address indexed tokenUser , uint256 tokenId);
    event TokenFetchEvent(uint256 tokenID, address indexed tokenUser );

    constructor() {
        owner = msg.sender; // Set the contract deployer as the owner
    }

    // Resgister NFT to QualitySC
    function registerNFT(
        uint256 _tokenId, 
        address _tokenOwner,
        string memory _tokenURI
    ) external returns (bool) {
        require(_tokenId > 0, "TokenID not valid identifier");
        require(_tokenOwner != address(0), "TokenOwner not valid ethereum address!");
        require(bytes(_tokenURI).length > 5, "TokenUrl not valid HTTP address!");
        require(!tokenExists[_tokenId], "TokenID already registered!");

        TokenList[_tokenOwner] = TokenNFT(_tokenId, _tokenOwner, _tokenURI);
        tokenExists[_tokenId] = true;
        tokenCount ++;

        emit TokenRegisterEvent(_tokenId, _tokenOwner, _tokenURI);
        return true;
    }

    // Request Access to NFT Content
    function requestAccess(
        uint256 _tokenId,
        uint256 _timeInSeconds
    )external returns(bool){
        require(_tokenId > 0, "TokenID not valid identifier.");
        require(_timeInSeconds > 1000, "Time Period not valid time.");
        require(msg.sender != address(0), "TokenOwner not valid ethereum address.");

        grantAccess(_tokenId, msg.sender, _timeInSeconds);
        return true;
    }

    function grantAccess(
        uint256 _tokenId,
        address _tokenUser ,
        uint256 _timeInSeconds
    ) internal returns (bool) {
        // Check if the user is the token owner
        require(TokenList[_tokenUser].tokenID != _tokenId, "User is token owner.");

        // Check if the user already has access
        require(!TokenAccessStatus[_tokenUser].status, "User already has access.");

        // Grant access
        TokenAccessStatus[_tokenUser] = TokenAccess(_tokenId, _tokenUser , _timeInSeconds, true);

        // Emit an event for access granted
        emit TokenAccessGrantEvent(_tokenId, _tokenUser , _timeInSeconds);

        return true;
    }

    function revokeAccess(address _user, uint256 _tokenId) external returns (bool) {
        // Check if the user has access to revoke
        require(TokenAccessStatus[_user].status == true, "User  does not have access.");
        require(TokenAccessStatus[_user].tokenID == _tokenId, "Token ID does not match.");

        // Revoke access
        TokenAccessStatus[_user].status = false;

        // Emit an event for revoking access
        emit TokenAccessRevokeEvent(_user, _tokenId);

        return true;
    }
}