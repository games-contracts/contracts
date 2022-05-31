// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "../@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract LPWrapper {
    IERC20 public stakedToken;

    string private nameLP;
    uint256 private _totalSupply;
    mapping(address => uint256) private _balances;

    constructor(string memory _name, address _stakedToken) {
        nameLP = _name;
        stakedToken = IERC20(_stakedToken);
    }

    function name() public view returns (string memory) {
        return nameLP;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function stake(uint256 amount) virtual public {
        _totalSupply = _totalSupply + amount;
        _balances[msg.sender] = _balances[msg.sender] + amount;
        stakedToken.transferFrom(msg.sender, address(this), amount);
    }

    function withdraw() virtual public {
        uint amount = _balances[msg.sender];
        require(amount > 0, "AONP: invalid amount");
        _totalSupply = _totalSupply - amount;
        _balances[msg.sender] = 0;
        stakedToken.transfer(msg.sender, amount);
    }
}
