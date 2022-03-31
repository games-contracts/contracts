// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ADTHero is AccessControl, ERC721Enumerable {
    using ECDSA for bytes32;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant OPERATION_ROLE = keccak256("OPERATION_ROLE");

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
        Military military; //0-4
        Sex sex; //0-1
        Army army; //0-2
        Level level; //0-3
    }

    string private baseUri;
    address private currency;
    address public revenueAddress;

    mapping(uint256 => HeroInfo) private heroes;
    mapping(uint256 => string) private tokenURIs;
    mapping(bytes => bool) private boughtSignature;

    event Minted(address player, uint256 tokenId, HeroInfo info);
    event SetBaseUri(string baseUri);
    event ChangeName(uint256 heroId, string name);
    event Sold(uint256 newItemId, address player, HeroInfo hero, uint256 price);
    event UsedSignature(bytes signature);
    event SetCurrency(address currency);
    event SetRevenueAddress(address revenue);
    event WithdrawRevenue(address revenue, uint256 amount);

    constructor() ERC721("ADT Hero", "ADTH") {
        baseUri = "https://api.arcadedot.xyz/hero/metadata/";

        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setRoleAdmin(MINTER_ROLE, OWNER_ROLE);
        _setRoleAdmin(OPERATION_ROLE, OWNER_ROLE);

        _setupRole(OWNER_ROLE, msg.sender);
    }

    function getHero(uint256 heroId) public view returns (HeroInfo memory) {
        require(_exists(heroId), "ERC721URIStorage: URI query for nonexistent token");
        return heroes[heroId];
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721: query for nonexistent token");
        return tokenURIs[tokenId];
    }

    function tokenIds(address user) external view returns (uint256[] memory ids){
        uint _balance = balanceOf(user);
        ids = new uint256[](_balance);
        for (uint i = 0; i < _balance; i++)
        {
            ids[i] = tokenOfOwnerByIndex(user, i);
        }
    }

    //=== USER FUNCTION===
    function buy(HeroInfo calldata hero, uint256 price, uint256 expire, bytes memory signature) external payable returns (uint256){
        require(verifySignature(hero, price, expire, signature), "Invalid signature");

        if (currency == address(0)) {
            require(msg.value >= price, "balance is not enough to pay fee");
        } else {
            IERC20 token = IERC20(currency);
            bool transferred = token.transferFrom(msg.sender, address(this), price);
            require(transferred, "Cannot transfer ERC20");
        }
        uint256 newItemId = mint(msg.sender, hero);
        emit Sold(newItemId, msg.sender, hero, price);
        return newItemId;
    }

    //=== INTERNAL FUNCTION===
    function mint(address player, HeroInfo memory hero) internal returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);

        heroes[newItemId] = hero;
        tokenURIs[newItemId] = string(abi.encodePacked(baseUri, uint2String(newItemId)));

        emit Minted(player, newItemId, hero);

        return newItemId;
    }

    function verifySignature(HeroInfo memory hero, uint256 price, uint256 expire, bytes memory signature)
    internal returns (bool) {
        require(boughtSignature[signature] == false, "signature has been used");
        boughtSignature[signature] = true;
        require(expire >= block.timestamp, "signature expired");
        bytes32 hash = keccak256(abi.encodePacked(
                msg.sender,
                price,
                hero.name,
                hero.military,
                hero.sex,
                hero.army,
                hero.level,
                address(this),
                expire
            ));
        bytes32 messageHash = hash.toEthSignedMessageHash();
        address signatory = messageHash.recover(signature);
        emit UsedSignature(signature);
        return hasRole(MINTER_ROLE, signatory);
    }
    //=== OPERATION FUNCTION===
    function withdrawRevenue() external onlyRole(OPERATION_ROLE) {
        require(revenueAddress != address(0), "must be set revenue address");
        IERC20 token = IERC20(currency);
        uint256 balanceOf = token.balanceOf(address(this));
        bool transferred = token.transfer(revenueAddress, balanceOf);
        require(transferred, "Cannot transfer ERC20");
        emit WithdrawRevenue(revenueAddress, balanceOf);
    }

    function changeName(uint256 heroId, string calldata name) external onlyRole(OPERATION_ROLE) {
        require(_exists(heroId), "query for nonexistent token");
        heroes[heroId].name = name;
        emit ChangeName(heroId, name);
    }
    //=== OWNER FUNCTION===
    function setRevenueAddress(address _revenue) external onlyRole(OWNER_ROLE) {
        revenueAddress = _revenue;
        emit SetRevenueAddress(_revenue);
    }

    function setCurrency(address _currency) external onlyRole(OWNER_ROLE) {
        currency = _currency;
        emit SetCurrency(_currency);
    }

    function setBaseUri(string calldata _baseUri) external onlyRole(OWNER_ROLE) {
        baseUri = _baseUri;
        emit SetBaseUri(_baseUri);
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
        ERC721(token).transferFrom(address(this), sendTo, tokenId);
    }
    //=== UTILITY FUNCTION===
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function uint2String(uint256 x) private pure returns (string memory) {
        if (x > 0) {
            string memory str;
            while (x > 0) {
                str = string(abi.encodePacked(uint8(x % 10 + 48), str));
                x /= 10;
            }
            return str;
        }
        return "0";
    }

    receive() payable external {}
}
