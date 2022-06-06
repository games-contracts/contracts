// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


interface INFTContract {
    function mintOne(address user, bytes calldata data) external returns (uint);
}

contract ArenaBox is ERC721, AccessControl {
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant SIGNER_ROLE = keccak256("SIGNER_ROLE");
    using ECDSA for bytes32;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    string private baseURI;
    INFTContract public NFTContract;

    event LogClaim(uint boxId, address user, address nftContract, uint nftId);

    constructor(string memory _name, string memory _symbol, string memory _uri) ERC721(_name, _symbol) {
        baseURI = _uri;
        _setRoleAdmin(SIGNER_ROLE, OWNER_ROLE);
        _setRoleAdmin(MINTER_ROLE, OWNER_ROLE);
        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setupRole(OWNER_ROLE, msg.sender);
    }


    function updateBaseURI(string memory _uri) external onlyRole(OWNER_ROLE) {
        require(bytes(_uri).length != 0, "invalid URI");
        baseURI = _uri;
    }

    function updateNFTContract(address _nft) external onlyRole(OWNER_ROLE) {
        require(_nft != address(0), "invalid address");
        NFTContract = INFTContract(_nft);
    }

    /**
    Owner function
    */
    function mint(address user) public onlyRole(MINTER_ROLE)
    returns (uint) {
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();
        _mint(user, newItemId);
        return newItemId;
    }

    function mintMany(address user, uint quantity) external
    {
        require(quantity > 0, "invalid quantity");
        for (uint i = 0; i < quantity; i++) {
            mint(user);
        }
    }
    /**
    Unbox function
    */
    function claim(uint boxId, bytes calldata data, bytes calldata signature) external returns (uint) {
        require(verifySignature(boxId, data, signature), "invalid signature");
        require(address(NFTContract) != address(0), "invalid contract");
        burn(boxId);
        uint nftId = NFTContract.mintOne(msg.sender, data);
        emit LogClaim(boxId, msg.sender, address(NFTContract), nftId);
        return nftId;
    }

    function burn(uint boxId) public {
        require(_isApprovedOrOwner(msg.sender, boxId), "caller is not owner nor approved");
        _burn(boxId);
    }

    /**
    Utility function
    */
    function verifySignature(uint boxId, bytes calldata data, bytes calldata signature)
    internal view returns (bool) {
        bytes32 hash = keccak256(abi.encodePacked(
                msg.sender,
                boxId,
                data,
                address(this)
            ));
        bytes32 messageHash = hash.toEthSignedMessageHash();
        address signatory = messageHash.recover(signature);
        return hasRole(SIGNER_ROLE, signatory);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
