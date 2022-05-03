// contracts/interfaces/IMarketServiceV1.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IMarketServicePartnerV1.sol";
import "./IMarketServiceUserV1.sol";
import "./IMarketServiceReadableV1.sol";


interface IMarketServiceV1 is IMarketServicePartnerV1, IMarketServiceUserV1, IMarketServiceReadableV1 {
    event Listed(uint256 listingId, address indexed nft, uint256 tokenId, bool auction);
    event Unlisted(uint256 listingId);
    event Sold(uint256 listingId, address indexed nft, uint256 tokenId, address buyer, bool auction);
    event Bid(uint256 auctionId, address bidder, uint256 amount);
    event Currency(address currency, bool status);
    event Withdraw(uint256 auctionId, address bidder, address currency, uint256 bid);
    event EndAuction(uint256 auctionId);
    event WithdrawProfit(address nft, address currency, uint256 amount, address receiver);
    event UpdatePrice(uint256 listingId, uint256 price);
    event AgencyBuy(uint256 listingId, uint256 price, address agency);
}
