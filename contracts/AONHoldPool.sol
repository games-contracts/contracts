// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract AONHoldPool is AccessControl, ReentrancyGuard {
    using EnumerableSet for EnumerableSet.UintSet;
    using Counters for Counters.Counter;
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    string public name;

    Counters.Counter private _packageIds;
    Counters.Counter private _stakedIds;

    mapping(address => uint[]) private _userStakingIds;
    mapping(uint => EnumerableSet.UintSet) private _rewardTokenIds;

    IERC20 public stakeToken;

    struct TokenStake {
        address token;
        uint amount;
    }

    struct Package {
        bool isActive;
        uint packageId;
        uint lockTime;
        uint supply;
        uint limit;
        TokenStake currency;
        TokenStake nft;
    }

    struct StakedInfo {
        bool withdraw;
        uint withdrawTime;
        uint packageId;
        address user;
        uint[] tokenIds;
    }

    mapping(uint => Package) private _packages;
    mapping(uint => StakedInfo) public _staked;

    event LogAddPackage(Package package);
    event LogStaked(address user, Package package, uint[] tokenIds, uint time);
    event LogWithdraw(address user, uint packageId, uint time);
    event LogInitRewardIds(uint packageId, uint[] tokenIds);
    event LogInitRewardIndex(uint packageId, uint fromId, uint toId);

    constructor(string memory _name,
        address _stakedToken
    )
    {
        require(_stakedToken != address(0), "invalid address params");
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

    function addPackage(
        uint lockTime) external onlyRole(OWNER_ROLE) {

        uint newId = _packageIds.current();
        _packageIds.increment();

        Package memory package;
        package.isActive = true;
        package.packageId = newId;
        package.lockTime = lockTime;

        _packages[newId] = package;
        emit LogAddPackage(package);
    }


    function toggleBoxType(uint packageId) public onlyRole(OWNER_ROLE) {
        _packages[packageId].isActive = !_packages[packageId].isActive;
    }

    function stake(uint packageId, uint[] calldata tokenIds) public activePackage(packageId) nonReentrant returns (uint) {
        Package memory _package = _packages[packageId];
        require(_package.limit > _package.supply, "over limit");
        bool requireERC20 = _package.currency.token != address(0);
        bool requireERC721 = _package.nft.token != address(0) && _package.nft.amount > 0;
        require(requireERC20 || requireERC721, "invalid stake");

        uint stakedId = _stakedIds.current();
        _stakedIds.increment();
        StakedInfo memory _stakedInfo;
        _stakedInfo.packageId = packageId;
        _stakedInfo.user = msg.sender;
        _stakedInfo.withdrawTime = block.timestamp + _package.lockTime;

        if (requireERC20) {
            bool transferred = IERC20(_package.currency.token).transferFrom(msg.sender, address(this), _package.currency.amount);
            require(transferred, "cannot transfer");
        }
        if (requireERC721) {
            uint length = tokenIds.length;
            require(_package.nft.amount == length, "miss match length");
            for (uint i; i < length; ++i) {
                IERC721(_package.nft.token).transferFrom(msg.sender, address(this), tokenIds[i]);
            }
            _stakedInfo.tokenIds = tokenIds;
        }

        _staked[stakedId] = _stakedInfo;
        _userStakingIds[msg.sender].push(stakedId);

        _packages[packageId].supply++;
        emit LogStaked(msg.sender, _package, tokenIds, block.timestamp);
        return stakedId;
    }

    function withdraw(uint stakedId) public nonReentrant {
        StakedInfo storage _stakedInfo = _staked[stakedId];
        require(!_stakedInfo.withdraw && _stakedInfo.user == msg.sender, "invalid stakedId");
        require(_stakedInfo.withdrawTime < block.timestamp, "cannot withdraw now");
        _stakedInfo.withdraw = true;
        Package memory _package = _packages[_stakedInfo.packageId];

        if (_package.currency.token != address(0)) {
            bool transferred = IERC20(_package.currency.token).transfer(msg.sender, _package.currency.amount);
            require(transferred, "cannot transfer");
        }
        if (_package.nft.token != address(0)) {
            uint length = _stakedInfo.tokenIds.length;
            for (uint i; i < length; ++i) {
                IERC721(_package.nft.token).transferFrom(address(this), msg.sender, _stakedInfo.tokenIds[i]);
            }
        }

        //        _package.rewardNFT.transferFrom(address(this), msg.sender, tokenId);
        emit LogWithdraw(msg.sender, stakedId, block.timestamp);
    }
    // ============ OPERATION FUNCTION ==============
    function getStakedIds(address user) public view returns (uint[] memory stakedIds) {
        stakedIds = new uint[](_userStakingIds[user].length);
        for (uint256 i; i < _userStakingIds[user].length; ++i) {
            stakedIds[i] = _userStakingIds[user][i];
        }
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
