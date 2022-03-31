// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


contract ClaimToken is AccessControl {
    string public constant name = "ADT Claim Contract";
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant SIGNER_ROLE = keccak256("SIGNER_ROLE");

    using ECDSA for bytes32;

    IERC20 public claimToken;
    uint public totalClaim;

    mapping(bytes => bool) public wasClaimed;
    mapping(address => uint) public claimedToken;

    event Claim(address user, uint amount);
    event UsedSignature(bytes signature);

    constructor(address _claimToken)
    {
        require(_claimToken != address(0));
        claimToken = IERC20(_claimToken);

        _setRoleAdmin(SIGNER_ROLE, OWNER_ROLE);
        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setupRole(OWNER_ROLE, msg.sender);
    }

    function claim(address user, uint amount, uint expire, bytes memory signature) public {
        require(getSigner(user, amount, expire, signature), "wrong signature");

        bool status = claimToken.transfer(msg.sender, amount);
        require(status, "transfer status is false.");
        totalClaim += amount;
        claimedToken[user] += amount;

        emit Claim(msg.sender, amount);
    }

    function getSigner(address user, uint amount, uint expire, bytes memory signature)
    internal returns (bool) {
        require(block.timestamp <= expire, "signature expire");
        require(!wasClaimed[signature], "signature was claimed");
        wasClaimed[signature] = true;
        bytes32 hash = keccak256(abi.encodePacked(user, amount, expire, address(this)));
        bytes32 messageHash = hash.toEthSignedMessageHash();
        address signatory = messageHash.recover(signature);
        emit UsedSignature(signature);
        return hasRole(SIGNER_ROLE, signatory);
    }

    // ============ EMERGENCY FUNCTION ==============

    function forceReturnERC20(
        address token,
        uint amount,
        address sendTo
    ) external onlyRole(OWNER_ROLE) {
        IERC20(token).transfer(sendTo, amount);
    }


    function forceReturnNative(uint amount, address payable sendTo) external onlyRole(OWNER_ROLE) {
        (bool success,) = sendTo.call{value : amount}("");
        require(success, "withdraw failed");
    }

    function forceReturnERC721(
        address sendTo,
        address token,
        uint tokenId
    ) external onlyRole(OWNER_ROLE) {
        IERC721(token).transferFrom(address(this), sendTo, tokenId);
    }

    receive() payable external {}

}
