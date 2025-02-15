// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

interface IQualitySC {
    function revokeAccess(address _user, uint256 _tokenId)external returns(bool);
}

contract OracleSC{
    address public qualitySC; // Address of the QualitySC contract

    event ProcessClockStarted(address indexed user, uint256 tokenId, uint256 timeInSeconds);
    event ProcessClockStopped(address indexed user);

    constructor(address _qualitySC) {
        qualitySC = _qualitySC; // Set the address of the QualitySC contract
    }

    function startProcessClock(address _tokenUser , uint256 _tokenId, uint256 _timeInSeconds) external {
        // Emit an event with the parameters needed for the offchain API
        emit ProcessClockStarted(_tokenUser , _tokenId, _timeInSeconds);
        
        // Additional logic can be added here if needed
    }

    // Function to be called by the offchain Node.js API to stop the process clock
    function stopProcessClock(address _tokenUser , uint256 _tokenId) external {
        // Call the revokeAccess function in the QualitySC contract
        IQualitySC(qualitySC).revokeAccess(_tokenUser , _tokenId);

        // Emit an event for stopping the process clock
        emit ProcessClockStopped(_tokenUser );
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