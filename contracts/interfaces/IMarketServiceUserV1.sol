// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IMarketServiceUserV1 {

    function createAuction(
        address nft,
        uint256 tokenId,
        uint256 initValue,
        address currency,
        uint256 duration
    ) external returns (uint256);

    function createAuctionBySig(
        address nft,
        uint256 tokenId,
        uint256 initValue,
        address currency,
        uint256 duration,
        uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s) external returns (uint256);

    function bid(uint256 auctionId, uint256 bidPrice) external payable returns (bool);

    function withdraw(uint256 auctionId, address bidder) external returns (bool);

    function endAuction(uint256 auctionId) external returns (bool);

    function endAuctionBySig(
        uint256 auctionId,
        uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s) external returns (bool);

    function list(
        address nft,
        uint256 tokenId,
        uint256 price,
        address currency
    ) external returns (uint256);

    function listBySig(address nft,
        uint256 tokenId,
        uint256 price,
        address currency,
        uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s) external returns (uint256);

    function buy(uint256 listingId, uint256 price) external payable returns (bool);

    function updatePrice(uint256 listingId, uint256 price) external returns (bool);

    function unList(uint256 listingId) external returns (bool);

    function unListBySig(
        uint256 listingId,
        uint nonce, uint expiry, uint8 v, bytes32 r, bytes32 s) external returns (bool);

}
