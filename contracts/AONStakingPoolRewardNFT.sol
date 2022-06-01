// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./@openzeppelin/contracts/utils/structs/EnumerableSet.sol";


contract AONStakingPoolRewardNFT is AccessControl, ReentrancyGuard {
    using EnumerableSet for EnumerableSet.UintSet;
    using Counters for Counters.Counter;
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    string public name;

    Counters.Counter private _packageIds;

    IERC20 public stakeToken;

    struct Package {
        bool isActive;
        uint packageId;
        uint amountStake;
        uint lockTime;
        uint totalStaked;
        uint limitStaked;
        IERC721 rewardNFT;
        uint[] rewardTokenIds;
    }

    mapping(uint => Package) private _packages;


    mapping(address => mapping(uint => bool)) public _userStaked;
    mapping(address => mapping(uint => uint)) public _unStakedTime;

    event LogAddPackage(Package package);
    event LogStaked(address user, Package package, uint time);
    event LogWithdraw(address user, uint packageId, uint time);
    event LogInitRewardIds(uint packageId, uint[] tokenIds);
    event LogInitRewardIndex(uint packageId, uint fromId, uint toId);

    constructor(string memory _name,
        address _stakedToken
    )
    {
        require(_stakedToken != address(0), "AONP: Invalid address params");
        name = _name;
        stakeToken = IERC20(_stakedToken);

        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setupRole(OWNER_ROLE, msg.sender);
    }

    modifier activePackage(uint packageId){
        require(_packages[packageId].isActive, "package not active");
        _;
    }
    function getPackages(uint fromIdx, uint toIdx) external view returns (Package[] memory packages) {
        uint length = toIdx > _packageIds.current() ? toIdx - fromIdx : _packageIds.current() - fromIdx;
        packages = new Package[](length);
        for (uint i = 0; i < length; ++i) {
            packages[i] = _packages[fromIdx + i];
        }
    }

    function addPackage(uint amountStake,
        uint lockTime,
        IERC721 rewardNFT) external onlyRole(OWNER_ROLE) {

        uint newId = _packageIds.current();
        _packageIds.increment();

        Package memory package;
        package.isActive = true;
        package.packageId = newId;
        package.amountStake = amountStake;
        package.lockTime = lockTime;
        package.rewardNFT = rewardNFT;

        _packages[newId] = package;
        emit LogAddPackage(package);
    }


    function toggleBoxType(uint packageId) public onlyRole(OWNER_ROLE) {
        _packages[packageId].isActive = !_packages[packageId].isActive;
    }

    function stake(uint packageId) public activePackage(packageId) nonReentrant {
        Package memory _package = _packages[packageId];
        require(_package.limitStaked > _package.totalStaked, "out of rewards");
        require(_userStaked[msg.sender][packageId] == false, "cannot stake more");

        _userStaked[msg.sender][packageId] = true;
        _unStakedTime[msg.sender][packageId] = block.timestamp + _package.lockTime;

        bool transferred = stakeToken.transferFrom(msg.sender, address(this), _package.amountStake);
        require(transferred, "cannot transfer");

        _packages[packageId].totalStaked++;
        emit LogStaked(msg.sender, _package, block.timestamp);
    }

    function withdraw(uint packageId) public nonReentrant {
        Package memory _package = _packages[packageId];
        require(_unStakedTime[msg.sender][packageId] <= block.timestamp, "AONP: Cannot unstake now");
        require(_userStaked[msg.sender][packageId], "nothing to withdraw");
        _userStaked[msg.sender][packageId] = false;

        bool transferred = stakeToken.transfer(msg.sender, _packages[packageId].amountStake);
        require(transferred, "cannot transfer");
        uint tokenId = _package.rewardTokenIds[_package.rewardTokenIds.length - 1];
        _packages[packageId].rewardTokenIds.pop();
        _package.rewardNFT.transferFrom(address(this), msg.sender, tokenId);
        emit LogWithdraw(msg.sender, packageId, block.timestamp);
    }
    // ============ OPERATION FUNCTION ==============
    function initRewardIds(uint packageId, uint[] calldata tokenIds) activePackage(packageId) external onlyRole(OWNER_ROLE) {
        require(_packages[packageId].rewardTokenIds.length == 0, "rewards has been init");
        uint length = tokenIds.length;
        uint count;
        for (uint i; i < length; ++i) {
            bool isOwnerOf = address(this) == _packages[packageId].rewardNFT.ownerOf(tokenIds[i]);
            if (isOwnerOf) {
                ++count;
                _packages[packageId].rewardTokenIds.push(tokenIds[i]);
            }
        }
        _packages[packageId].limitStaked = count;
        emit LogInitRewardIds(packageId, tokenIds);
    }

    function initRewardIndex(uint packageId, uint fromId, uint toId) activePackage(packageId) external onlyRole(OWNER_ROLE) {
        require(_packages[packageId].rewardTokenIds.length == 0, "rewards has been init");
        uint count;
        for (uint i = fromId; i <= toId; ++i) {
            bool isOwnerOf = address(this) == _packages[packageId].rewardNFT.ownerOf(i);
            if (isOwnerOf) {
                ++count;
                _packages[packageId].rewardTokenIds.push(i);
            }
        }
        _packages[packageId].limitStaked = count;
        emit LogInitRewardIndex(packageId, fromId, toId);
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
        IERC721(token).transferFrom(address(this), sendTo, tokenId);
    }
}
