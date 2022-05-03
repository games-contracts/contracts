// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IMarketServiceReadableV1 {

    struct Listing {
        bool isEnded;
        address nft;
        address currency;
        address owner;
        uint256 tokenId;
        uint256 fee;
        uint256 price;
        uint256 id;
    }

    struct Auction {
        bool isEnded;
        address nft;
        address winner;
        address owner;
        address currency;
        uint256 tokenId;
        uint256 fee;
        uint256 bid;
        uint256 bidDuration;
        uint256 end;
        uint256 id;
    }

    function getListing(uint256 listingId) external view returns (Listing memory);

    function getAuction(uint256 auctionId) external view returns (Auction memory);

    function getListingByNFT(address nft, uint256 tokenId) external view returns (Listing memory);

    function getAuctionByNFT(address nft, uint256 tokenId) external view returns (Auction memory);

    function getByNFT(address nft, uint256 tokenId) external view returns (Auction memory auction, Listing memory listing);


    function getCurrentBid(uint256 auctionId, address bidder) external view returns (uint256);

    function getBidding(address buyer) external view returns (uint256[] memory auctionIds, uint256[] memory amounts);
}
