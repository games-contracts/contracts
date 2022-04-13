// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

interface IADTHero {
    enum Military {
        CHOSON,
        PERSIAN,
        GREEK,
        EGYPTIAN,
        ROMAN
    }

    enum Sex {
        MALE,
        FEMALE
    }

    enum Army {
        BARBARIAN,
        ARCHER,
        CAVALRY
    }
    enum Level {
        LEVEL1,
        LEVEL2,
        LEVEL3,
        LEVEL4
    }

    struct HeroInfo {
        string name;
        Military military;
        Sex sex;
        Army army;
        Level level;
    }

    function buy(HeroInfo calldata hero, uint256 price, uint256 expire, bytes memory signature) external payable returns (uint256);

    function transferFrom(address from, address to, uint256 tokenId) external;
}

contract ADTHShop is AccessControl {
    using ECDSA for bytes32;

    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    IADTHero public ADTHero;
    IERC20 public ADT;
    address public revenueAddress;

    mapping(bytes => bool) private boughtSignature;

    event Sold(uint256[] newItemIds, address player, IADTHero.HeroInfo[] heroes, uint256[] prices, uint256 expire, bytes signature);
    event SetCurrency(address currency);
    event SetRevenueAddress(address revenue);

    constructor(address _ADTH, address _currency) {
        ADTHero = IADTHero(_ADTH);
        ADT = IERC20(_currency);
        ADT.approve(_ADTH, type(uint256).max);
        _setRoleAdmin(MINTER_ROLE, OWNER_ROLE);
        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setupRole(OWNER_ROLE, msg.sender);
    }

    //=== USER FUNCTION===
    function buy(IADTHero.HeroInfo[] calldata heroes, uint256[] calldata prices, bytes[] calldata buySigs, uint256 expire, bytes memory signature) external payable returns (uint256[] memory newItemIds){
        uint256 quantity = heroes.length;
        require(prices.length == quantity, "ADTHS::miss match prices");
        require(expire >= block.timestamp, "ADTHS::signature expired");
        require(boughtSignature[signature] == false, "ADTHS::signature has been used");
        boughtSignature[signature] = true;
        require(verifySignature(heroes, prices, buySigs, expire, signature), "ADTHS::wrong signature");
        uint256 amount;
        for (uint256 i; i < quantity; i++) {
            amount += prices[i];
        }
        bool transferred = ADT.transferFrom(msg.sender, address(this), amount);
        require(transferred, "cannot transfer ERC20");
        newItemIds = new uint256[](quantity);
        for (uint256 i; i < quantity; i++) {
            uint256 newItemId = ADTHero.buy(heroes[i], prices[i], expire + i, buySigs[i]);
            ADTHero.transferFrom(address(this), msg.sender, newItemId);
            newItemIds[i] = newItemId;
        }
        emit Sold(newItemIds, msg.sender, heroes, prices, expire, signature);
    }

    //=== INTERNAL FUNCTION===
    function getHash(IADTHero.HeroInfo[] calldata heroes, bytes[] calldata buySigs) internal pure returns (bytes32 heroHash, bytes32 buyHash) {
        uint256 quantity = heroes.length;
        require(buySigs.length == quantity, "miss match sigs");
        bytes32[] memory heroesHash = new bytes32[](quantity);
        bytes32[] memory buySigsHash = new bytes32[](quantity);
        for (uint256 i; i < quantity; i++) {
            heroesHash[i] = keccak256(abi.encode(
                    heroes[i].name,
                    heroes[i].military,
                    heroes[i].sex,
                    heroes[i].army,
                    heroes[i].level
                ));
            buySigsHash[i] = keccak256(abi.encode(buySigs[i]));
        }
        heroHash = keccak256(abi.encodePacked(heroesHash));
        buyHash = keccak256(abi.encodePacked(buySigsHash));
        return (heroHash, buyHash);
    }

    function verifySignature(IADTHero.HeroInfo[] calldata heroes, uint256[] calldata prices, bytes[] calldata buySigs, uint256 expire, bytes memory signature)
    public view returns (bool) {
        (bytes32 heroHash, bytes32 buyHash) = getHash(heroes, buySigs);
        bytes32 hash = keccak256(abi.encodePacked(
                msg.sender,
                heroHash,
                prices,
                buyHash,
                expire,
                address(this)
            ));
        bytes32 messageHash = hash.toEthSignedMessageHash();
        address signatory = messageHash.recover(signature);
        return hasRole(MINTER_ROLE, signatory);
    }
    //=== OWNER FUNCTION===
    function setRevenueAddress(address _revenue) external onlyRole(OWNER_ROLE) {
        revenueAddress = _revenue;
        emit SetRevenueAddress(_revenue);
    }

    function setCurrency(address _currency) external onlyRole(OWNER_ROLE) {
        ADT = IERC20(_currency);
        emit SetCurrency(_currency);
    }
    //===EMERGENCY FUNCTION===
    function forceReturnERC20(
        address token,
        uint256 amount,
        address sendTo
    ) external onlyRole(OWNER_ROLE) {
        IERC20(token).transfer(sendTo, amount);
    }

    function forceReturnNative(uint256 amount, address payable sendTo) external onlyRole(OWNER_ROLE) {
        (bool success,) = sendTo.call{value : amount}("");
        require(success, "withdraw failed");
    }

    function forceReturnERC721(
        address sendTo,
        address token,
        uint256 tokenId
    ) external onlyRole(OWNER_ROLE) {
        IERC721(token).transferFrom(address(this), sendTo, tokenId);
    }

    receive() payable external {}
}
