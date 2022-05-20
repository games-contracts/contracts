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
    Counters.Counter private _boxTypeIds;

    struct BoxType {
        bool isActive;
        uint boxTypeId;
        address nftContract;
        string name;
        string prefixUri;
    }

    mapping(uint => BoxType) private boxTypes;
    mapping(uint => uint) private boxes;


    event LogClaim(uint boxId, address user, address nftContract, uint nftId);
    event UpdateTokenUri(uint itemType, string uri);
    event NewBoxType(uint boxTypeId, string name, address nftContract, string prefixUri);

    constructor() ERC721("Arena of NFT - Box", "AON Box") {
        _setRoleAdmin(SIGNER_ROLE, OWNER_ROLE);
        _setRoleAdmin(MINTER_ROLE, OWNER_ROLE);
        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setupRole(OWNER_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function typeOf(uint tokenId) public view returns (uint) {
        require(_exists(tokenId), "query for nonexistent token");
        return boxes[tokenId];
    }

    function tokenURI(uint tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "query for nonexistent token");
        uint bType = boxes[tokenId];
        return string(abi.encodePacked(boxTypes[bType].prefixUri, uint2String(tokenId)));
    }

    function getBoxTypes() external view returns (BoxType[] memory types)  {
        types = new BoxType[](_boxTypeIds.current());
        for (uint i = 0; i < _boxTypeIds.current(); i++) {
            types[i] = boxTypes[i];
        }
    }

    /**
    Owner function
    */
    function updateBoxType(uint _typeId, string calldata name, address nftContract, string calldata prefixUri)
    external onlyRole(OWNER_ROLE) {
        BoxType storage _boxType = boxTypes[_typeId];
        _boxType.name = name;
        _boxType.nftContract = nftContract;
        _boxType.prefixUri = prefixUri;
        emit NewBoxType(_typeId, name, nftContract, prefixUri);
    }

    function addBoxType(string calldata name, address nftContract, string calldata prefixUri)
    public onlyRole(OWNER_ROLE) returns (uint) {
        uint newTypeId = _boxTypeIds.current();
        _boxTypeIds.increment();

        BoxType memory _boxType;
        _boxType.boxTypeId = newTypeId;
        _boxType.isActive = true;
        _boxType.name = name;
        _boxType.nftContract = nftContract;
        _boxType.prefixUri = prefixUri;
        boxTypes[newTypeId] = _boxType;

        emit NewBoxType(newTypeId, name, nftContract, prefixUri);
        return newTypeId;
    }

    function toggleBoxType(uint boxTypeId) public onlyRole(OWNER_ROLE) {
        boxTypes[boxTypeId].isActive = !boxTypes[boxTypeId].isActive;
    }


    function mint(address user, uint _type) internal
    returns (uint) {
        require(boxTypes[_type].isActive == true, "BoxType is not existed");
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();

        _mint(user, newItemId);

        boxes[newItemId] = _type;

        return newItemId;
    }

    function mintOne(address user, uint _type) external onlyRole(MINTER_ROLE)
    returns (uint) {
        return mint(user, _type);
    }

    function mintMany(address user, uint quantity, uint _type) external onlyRole(MINTER_ROLE)
    {
        require(quantity > 0, "invalid quantity");
        for (uint i = 0; i < quantity; i++) {
            mint(user, _type);
        }
    }

    /**
    Unbox function
    */
    function claim(uint boxId, bytes calldata data, bytes calldata signature) external returns (uint) {
        require(verifySignature(boxId, data, signature), "invalid signature");
        uint _type = boxes[boxId];
        BoxType memory _box = boxTypes[_type];
        require(_box.nftContract != address(0), "invalid contract");
        burn(boxId);
        uint nftId = INFTContract(_box.nftContract).mintOne(msg.sender, data);
        emit LogClaim(boxId, msg.sender, _box.nftContract, nftId);
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

    function uint2String(uint256 x) private pure returns (string memory) {
        if (x > 0) {
            string memory str;
            while (x > 0) {
                str = string(abi.encodePacked(uint8(x % 10 + 48), str));
                x /= 10;
            }
            return str;
        }
        return "0";
    }
}
