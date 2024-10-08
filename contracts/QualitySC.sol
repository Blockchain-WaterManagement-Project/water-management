//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./NFTCollection.sol";
import "./OracleSC.sol";

contract QualitySC {
  OracleSC public oracleSC;

  // Mapping of NFTs to their owners
  mapping(address => mapping(uint256 => bool)) public nftOwners;

  // Mapping of trade requests to their status
  mapping(uint256 => TradeRequest) public tradeRequests;

  // Event emitted when a trade request is made
  event TradeRequestMade(uint256 requestId, address buyer, uint256 nftId);

  // Event emitted when a trade is approved
  event TradeApproved(uint256 requestId, address buyer, uint256 nftId);

  // Event emitted when a trade is completed
  event TradeCompleted(uint256 requestId, address buyer, uint256 nftId);

  // Struct to represent a trade request
  struct TradeRequest {
    uint256 nftId;
    address buyer;
    address seller;
    uint256 fees;
    bool approved;
  }

  // Function to request rights to trade an NFT
  function requestTrade(uint256 _nftId, address _seller) public {
    // Check if the NFT exists and the buyer is not the owner
    require(nftOwners[_seller][_nftId], "NFT does not exist or buyer is the owner");

    // Create a new trade request
    uint256 requestId = uint256(keccak256(abi.encodePacked(_nftId, _seller, msg.sender)));
    tradeRequests[requestId] = TradeRequest(_nftId, msg.sender, _seller, 0, false);

    // Emit event
    emit TradeRequestMade(requestId, msg.sender, _nftId);
  }

  // Function to approve a trade request
  function approveTrade(uint256 _requestId) public {
    // Check if the trade request exists and the caller is the seller
    require(tradeRequests[_requestId].seller == msg.sender, "Trade request does not exist or caller is not the seller");

    // Set the approved flag to true
    tradeRequests[_requestId].approved = true;

    // Emit event
    emit TradeApproved(_requestId, tradeRequests[_requestId].buyer, tradeRequests[_requestId].nftId);
  }

  // Function to transfer fees for re-encryption and verification
  function transferFees(uint256 _requestId, uint256 _fees) public {
    // Check if the trade request exists and the caller is the buyer
    require(tradeRequests[_requestId].buyer == msg.sender, "Trade request does not exist or caller is not the buyer");

    // Set the fees
    tradeRequests[_requestId].fees = _fees;

    // Forward fees to OracleSC smart contract
    oracleSC.forwardFees(_requestId, _fees);
  }

  // Function to confirm trade completion
  function confirmTradeCompletion(uint256 _requestId, bool _verified) public {
    // Check if the trade request exists and the caller is the OracleSC smart contract
    require(tradeRequests[_requestId].approved, "Trade request does not exist or not approved");

    // Check if the verification result is true
    require(_verified, "Verification failed");

    // Transfer payment to seller
    payable(tradeRequests[_requestId].seller).transfer(tradeRequests[_requestId].fees);

    // Transfer NFT to buyer
    nftOwners[tradeRequests[_requestId].buyer][tradeRequests[_requestId].nftId] = true;
    nftOwners[tradeRequests[_requestId].seller][tradeRequests[_requestId].nftId] = false;

    // Emit event
    emit TradeCompleted(_requestId, tradeRequests[_requestId].buyer, tradeRequests[_requestId].nftId);
  }
}