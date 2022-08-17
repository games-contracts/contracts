// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./@openzeppelin/contracts/access/Ownable.sol";


interface IERC20 {
    function transfer(address to, uint value) external returns (bool);

    function transferFrom(address from, address to, uint value) external returns (bool);
}


contract MultiSend is Ownable {
    function sendEther(address payable[] calldata recipients, uint[] calldata values) external payable {
        for (uint i; i < recipients.length; i++)
            recipients[i].transfer(values[i]);
        uint balance = address(this).balance;
        if (balance > 0)
            payable(msg.sender).transfer(balance);
    }

    function sendToken(IERC20 token, address[] calldata recipients, uint[] calldata values) external {
        uint total;
        for (uint i; i < recipients.length; i++)
            total += values[i];
        require(token.transferFrom(msg.sender, address(this), total));
        for (uint i; i < recipients.length; i++)
            require(token.transfer(recipients[i], values[i]));
    }

    function sendTokenSimple(IERC20 token, address[] calldata recipients, uint[] calldata values) external {
        for (uint i; i < recipients.length; i++)
            require(token.transferFrom(msg.sender, recipients[i], values[i]));
    }

    function emergencyWithdrawERC20(
        address token,
        uint amount,
        address sendTo
    ) external onlyOwner {
        IERC20(token).transfer(sendTo, amount);
    }

    function emergencyWithdrawNative(uint amount, address payable sendTo) external onlyOwner {
        (bool success,) = sendTo.call{value : amount}("");
        require(success, "withdraw failed");
    }
}
