//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./NFTCollection.sol";

contract QualitySC{
    enum ListingStatus {
        Tradeable,
        Readonly,
        Traded
    }
    struct Listing {
        ListingStatus status;
        address owner;
        address token;
        uint tokenId;
        uint price;
    }
    uint private listingId = 0;
    mapping (uint => Listing) private listings;

    function listToken(address _token, uint _tokenId, uint _price) external {
        NFTCollection(_token).safeTransferFrom(msg.sender, address(this), _tokenId);

        Listing memory _listing = Listing(
            ListingStatus.Readonly,
            msg.sender,
            _token,
            _tokenId,
            _price
        );

        listingId ++;
        listings[listingId] = _listing;
    }

    function tradeToken(uint _listingId) external payable {
        Listing storage _listing = listings[_listingId];
        require(msg.sender != _listing.owner, "Sorry! You trade your own asset.");
        require(_listing.status == ListingStatus.Tradeable, "Sorry! This asset cannot be traded.");
        require(msg.value >= _listing.price, "Sorry! You do not have enough funds.");

        _listing.status = ListingStatus.Traded;

        payable(_listing.owner).transfer(_listing.price);
    }

    function cancleTrade(uint _listingId) public{
        Listing storage _listing = listings[_listingId];
        require(_listing.status == ListingStatus.Tradeable, "Sorry! Listing is not tradeable.");
        require(msg.sender == _listing.owner, "Sorry! Only owner can cancel listing.");

        _listing.status = ListingStatus.Readonly;
    }
}