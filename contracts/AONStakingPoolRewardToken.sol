// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "./@openzeppelin/contracts/utils/math/Math.sol";
import "./@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./@openzeppelin/contracts/access/AccessControl.sol";
import "./@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./utils/LPWrapper.sol";


contract AONStakingPoolRewardToken is LPWrapper, AccessControl, ReentrancyGuard {
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    uint public constant SECONDS_MONTH = 30 * 86_400;
    uint public constant PRECISION_FACTOR = 10 ** 12;

    IERC20 public stakeToken;

    // Limit totals users join Pool
    uint public limitUsers;
    // Limit totals stakeToken staked
    uint public limitVolume;
    // Limit min stake per user
    uint public minStakedPerUser;
    // Limit totals stakeToken staked per user
    uint public limitStakedPerUser;
    // Start Pool at time
    uint public startTime;
    // Duration lock time
    uint public lockTime;
    // Harvest at time
    uint public harvestTime;
    // MPR decimals
    uint public mpr;

    event RewardAdded(uint reward);
    event Staked(address indexed user, uint amount, uint time);
    event Withdrawn(address indexed user, uint time);
    event RewardPaid(address indexed user, uint reward, uint time);


    struct UserInfo {
        uint unlockTime;
        uint lastEarnTime;
        uint earnedAmount;
    }

    uint public totalUsers;
    mapping(address => UserInfo) public users;

    /**
     * @param _name: Name of Pool
     * @param _stakedToken: Address of stake token
     * @param _startTime: Start Pool at time
     * @param _lockTime: can unlock token after time
     * @param _harvestTime: vesting token after time
     * @param _mpr: Monthly Percentage Rate
     */
    constructor(string memory _name,
        address _stakedToken,
        uint _startTime,
        uint _lockTime,
        uint _harvestTime,
        uint _mpr
    )
    LPWrapper(_name, _stakedToken) {
        require(_stakedToken != address(0), "AONP: Invalid address params");

        stakeToken = IERC20(_stakedToken);

        startTime = _startTime;
        lockTime = _lockTime;
        harvestTime = _harvestTime;

        mpr = _mpr;

        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setupRole(OWNER_ROLE, msg.sender);
    }

    /**
     * @param _limitUsers: Limit totals users join Pool, 0 for unlimited
     * @param _limitVolume: Limit totals stakeToken staked, 0 for unlimited
     * @param _minStakedPerUser: Min stakeToken staked per user
     * @param _limitStakedPerUser: Limit totals stakeToken staked per user, 0 for unlimited
     */
    function configLimit(uint _limitUsers,
        uint _limitVolume,
        uint _minStakedPerUser,
        uint _limitStakedPerUser
    ) external onlyRole(OWNER_ROLE) {
        limitUsers = _limitUsers;
        limitVolume = _limitVolume;
        minStakedPerUser = _minStakedPerUser;
        limitStakedPerUser = _limitStakedPerUser;
    }

    function stake(uint _amount) public override nonReentrant {
        require(_amount > 0, "AONP: Cannot stake 0");
        require(startTime <= block.timestamp, "AONP: Pool is not started");

        uint stakedAmount = balanceOf(msg.sender);
        if (limitUsers > 0 && stakedAmount == 0) {
            require(totalUsers + 1 <= limitUsers, "AONP: No more user can join Pool");
            totalUsers++;
        }
        if (limitVolume > 0) {
            require(balanceOf(address(this)) + _amount <= limitVolume, "AONP: Pool cannot stake more");
        }
        if (minStakedPerUser > 0) {
            require(stakedAmount >= minStakedPerUser, "AONP: not enough amount stake");
        }
        if (limitStakedPerUser > 0) {
            require(stakedAmount + _amount <= limitStakedPerUser, "AONP: User cannot stake more");
        }

        if (stakedAmount > 0) {
            harvest();
        }

        users[msg.sender].lastEarnTime = block.timestamp;
        users[msg.sender].unlockTime = block.timestamp + lockTime;
        super.stake(_amount);

        emit Staked(msg.sender, _amount, block.timestamp);
    }

    function withdraw() public override nonReentrant {
        require(users[msg.sender].unlockTime <= block.timestamp, "AONP: Cannot unstake now");

        harvest();

        super.withdraw();

        delete users[msg.sender];
        emit Withdrawn(msg.sender, block.timestamp);
    }

    function lastTimeRewardApplicable() public view returns (uint) {
        return Math.min(block.timestamp, users[msg.sender].unlockTime);
    }

    function earned(address _account) public view returns (uint) {
        UserInfo memory _user = users[_account];
        uint progress = (mpr * (lastTimeRewardApplicable() - _user.lastEarnTime) * PRECISION_FACTOR) / (SECONDS_MONTH * lockTime);
        return
        (balanceOf(_account) * progress / PRECISION_FACTOR) - _user.earnedAmount;
    }

    function harvest() public {
        uint reward = earned(msg.sender);
        if (reward > 0) {
            users[msg.sender].earnedAmount += reward;
            users[msg.sender].lastEarnTime = block.timestamp;
            stakedToken.transfer(msg.sender, reward);
            emit RewardPaid(msg.sender, reward, block.timestamp);
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
}
