// contracts/utils/Token.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    constructor(uint initialSupply) ERC20("Token Test", "Token Test") {
        _mint(msg.sender, initialSupply);
    }
    function mint(address user, uint amount) public {
        _mint(user, amount);
    }
}
