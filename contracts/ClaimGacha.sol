// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface INFTContract {
    function mintOne(address user, bytes calldata data) external returns (uint);
}

contract ClaimGacha is AccessControl {
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant SIGNER_ROLE = keccak256("SIGNER_ROLE");

    using ECDSA for bytes32;
    mapping(string => uint) public claimed;

    event LogClaimToken(string itx, address user, address token, uint amount);
    event LogClaimHero(string itx, address user, address token, uint tokenId);

    constructor()  {
        _setRoleAdmin(SIGNER_ROLE, OWNER_ROLE);
        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setupRole(OWNER_ROLE, msg.sender);
    }


    function claimToken(string calldata itx, address user, address token, uint amount, bytes memory signature) public {
        require(amount > 0, "invalid amount");
        require(claimed[itx] == 0, "itx was claimed");
        claimed[itx] = block.number;

        bytes32 hash = keccak256(abi.encodePacked(itx, user, token, amount, address(this)));
        require(verifySignature(hash, signature), "wrong signature");

        bool transferred = IERC20(token).transfer(user, amount);
        require(transferred, "cannot transfer");

        emit LogClaimToken(itx, user, token, amount);
    }

    function claimHero(string calldata itx, address user, address token, bytes calldata data, bytes calldata signature) external {
        require(claimed[itx] == 0, "itx was claimed");
        claimed[itx] = block.number;
        bytes32 hash = keccak256(abi.encodePacked(itx, user, token, data, address(this)));
        require(verifySignature(hash, signature), "invalid signature");
        uint nftId = INFTContract(token).mintOne(user, data);
        emit LogClaimHero(itx, user, token, nftId);
    }

    function verifySignature(bytes32 hash, bytes memory signature)
    internal view returns (bool) {
        bytes32 messageHash = hash.toEthSignedMessageHash();
        address signatory = messageHash.recover(signature);
        return hasRole(SIGNER_ROLE, signatory);
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

    receive() payable external {}
}
