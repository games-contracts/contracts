// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Snapshot.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "./extensions/BPContract.sol";


contract AON is AccessControl, ERC20Burnable, ERC20Snapshot, ERC20Pausable {
    bytes32 public constant DEPLOYER_ROLE = keccak256("DEPLOYER_ROLE");

    bool public isInPreventBotMode;

    BPContract public BP;

    constructor() ERC20("Arena of NFT", "AON") {
        // Public Sale
        _mint(msg.sender, 80_000_000 * (10 ** decimals()));
        // Pre-Public Sale
        _mint(msg.sender, 10_000_000 * (10 ** decimals()));
        // Advisor
        _mint(msg.sender, 40_000_000 * (10 ** decimals()));
        // Team
        _mint(msg.sender, 400_000_000 * (10 ** decimals()));
        // Community. Marketing. System
        _mint(msg.sender, 300_000_000 * (10 ** decimals()));
        //Staking. Farming reward
        _mint(msg.sender, 370_000_000 * (10 ** decimals()));
        //Play to Earn reward
        _mint(msg.sender, 600_000_000 * (10 ** decimals()));
        //Liquidity
        _mint(msg.sender, 200_000_000 * (10 ** decimals()));

        _setRoleAdmin(DEPLOYER_ROLE, DEPLOYER_ROLE);
        _setupRole(DEPLOYER_ROLE, msg.sender);
    }

    /**
     * Utilities functions
     */
    function snapshot() public onlyRole(DEPLOYER_ROLE) returns (uint) {
        return _snapshot();
    }

    function pause() public onlyRole(DEPLOYER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEPLOYER_ROLE) {
        _unpause();
    }

    function togglePreventBotMode() public onlyRole(DEPLOYER_ROLE) {
        isInPreventBotMode = !isInPreventBotMode;
    }

    function setBPContract(address _bp) public onlyRole(DEPLOYER_ROLE) {
        require(address(_bp) == address(0), "invalid address");
        BP = BPContract(_bp);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override(ERC20, ERC20Pausable, ERC20Snapshot) {
        if (isInPreventBotMode) {
            BP.protect(from, to, amount);
        }
        super._beforeTokenTransfer(from, to, amount);
    }
}
