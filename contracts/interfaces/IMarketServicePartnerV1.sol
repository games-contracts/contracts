// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMarketServicePartnerV1 {
    function getProfit(address nft, address currency) external view returns (uint256);

    function withdrawProfit(address nft, address currency) external returns (bool);
}
