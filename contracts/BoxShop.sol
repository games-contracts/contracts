// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

interface IArenaBox {
    function mintMany(address user, uint quantity) external;
}

contract BoxShop is AccessControl {

    using Counters for Counters.Counter;

    Counters.Counter private _packageIds;

    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant OPERATION_ROLE = keccak256("OPERATION_ROLE");

    string public name;
    address public _box;

    struct Package {
        bool isActive;
        uint packageId;
        uint startTime;
        uint endTime;
        uint sellLimit;
        uint sold;
        uint price;
        address currency;
        address[] box;
        uint[] boxAmounts;
        string name;
    }

    mapping(uint => Package) private _packages;

    event LogUpdatePackage(Package package);
    event LogAddPackage(Package package);

    event LogBuy(address user, uint packageId, uint quantity, uint totalPrice);

    constructor(string memory _name) {
        name = _name;
        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setRoleAdmin(OPERATION_ROLE, OWNER_ROLE);
        _setupRole(OWNER_ROLE, msg.sender);
    }

    function getPackages(uint fromIdx, uint toIdx) external view returns (Package[] memory packages) {
        uint length = toIdx > _packageIds.current() ? toIdx - fromIdx : _packageIds.current() - fromIdx;
        packages = new Package[](length);
        for (uint i = 0; i < length; ++i) {
            packages[i] = _packages[fromIdx + i];
        }
    }

    function buy(uint packageId, uint quantity) public payable {
        require(quantity > 0, "quantity must gt 0");
        Package storage package = _packages[packageId];
        require(
            package.endTime >= block.timestamp &&
            package.startTime <= block.timestamp, "not in buy time");
        require(package.isActive == true, "package not active");

        package.sold += quantity;
        require(package.sold <= package.sellLimit, "not enough quantity");

        uint totalPrice = package.price * quantity;

        if (package.currency == address(0)) {
            require(msg.value >= totalPrice, "balance is not enough to pay fee");
        } else {
            IERC20 token = IERC20(package.currency);
            bool transferred = token.transferFrom(msg.sender, address(this), totalPrice);
            require(transferred, "Cannot transfer ERC20");
        }
        uint length = package.box.length;
        for (uint j; j < quantity; ++j) {
            for (uint i; i < length; ++i) {
                IArenaBox(package.box[i]).mintMany(msg.sender, package.boxAmounts[i]);
            }
        }
        emit LogBuy(msg.sender, packageId, quantity, totalPrice);
    }

    //====== ADMIN FUNCTION
    function addPackage(
        uint startTime,
        uint endTime,
        uint sellLimit,
        uint price,
        address currency,
        address[] calldata box,
        uint[] calldata boxAmounts,
        string calldata _name
    ) external onlyRole(OWNER_ROLE) returns (uint)
    {
        require(box.length > 0 && box.length == boxAmounts.length, "miss match length");
        uint newTypeId = _packageIds.current();
        _packageIds.increment();
        Package memory package;
        package.packageId = newTypeId;
        package.isActive = true;
        package.startTime = startTime;
        package.endTime = endTime;
        package.name = _name;
        package.sellLimit = sellLimit;
        package.price = price;
        package.currency = currency;
        package.box = box;
        package.boxAmounts = boxAmounts;
        _packages[newTypeId] = package;
        emit LogAddPackage(package);
        return newTypeId;
    }

    function updatePackage(
        uint packageId,
        uint startTime,
        uint endTime,
        uint sellLimit,
        uint price,
        address currency,
        address[] calldata box,
        uint[] calldata boxAmounts,
        string calldata _name
    ) external onlyRole(OWNER_ROLE)
    {
        require(box.length > 0 && box.length == boxAmounts.length, "miss match length");
        Package storage package = _packages[packageId];
        package.name = _name;
        package.startTime = startTime;
        package.endTime = endTime;
        package.sellLimit = sellLimit;
        package.price = price;
        package.currency = currency;
        package.box = box;
        package.boxAmounts = boxAmounts;
        emit LogUpdatePackage(package);
    }

    function toggleBoxType(uint packageId) public onlyRole(OWNER_ROLE) {
        _packages[packageId].isActive = !_packages[packageId].isActive;
    }

    function setBox(address box) public onlyRole(OWNER_ROLE) {
        _box = box;
    }

    // ============ EMERGENCY FUNCTION ==============

    function emergencyWithdrawERC20(
        address token,
        uint amount,
        address sendTo
    ) external onlyRole(OWNER_ROLE) {
        IERC20(token).transfer(sendTo, amount);
    }

    function emergencyWithdrawNative(uint amount, address payable sendTo) external onlyRole(OWNER_ROLE) {
        (bool success,) = sendTo.call{value : amount}("");
        require(success, "withdraw failed");
    }

    function emergencyWithdrawERC721(
        address sendTo,
        address token,
        uint tokenId
    ) external onlyRole(OWNER_ROLE) {
        ERC721(token).transferFrom(address(this), sendTo, tokenId);
    }

    receive() payable external {}
}
