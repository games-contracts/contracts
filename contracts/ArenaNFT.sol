// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ArenaNFT is ERC721, AccessControl {

    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(uint => string) _heroIds;
    string public baseURI;

    constructor() ERC721("AON Hero", "AON Hero") {
        baseURI = "https://aon/nft/";
        _setRoleAdmin(MINTER_ROLE, OWNER_ROLE);
        _setRoleAdmin(OWNER_ROLE, OWNER_ROLE);
        _setupRole(OWNER_ROLE, msg.sender);
    }

    function getInfo(uint tokenId) external view returns (string memory heroId) {
        require(_exists(tokenId), "not existent");
        heroId = _heroIds[tokenId];
    }
    /**
    Owner function
    */
    function mint(address user, string memory heroId) internal
    returns (uint) {
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();

        _mint(user, newItemId);
        _heroIds[newItemId] = heroId;
        return newItemId;
    }

    function mintOne(address user, bytes calldata data) external onlyRole(MINTER_ROLE)
    returns (uint) {
        return mint(user, decodeParams(data));
    }

    function mintOne(address user, string calldata heroId) external onlyRole(MINTER_ROLE)
    returns (uint) {
        return mint(user, heroId);
    }

    function mintMany(address user, string[] calldata heroIds) external onlyRole(MINTER_ROLE)
    {
        uint length = heroIds.length;
        require(length > 0, "invalid length");
        for (uint i = 0; i < length; ++i) {
            mint(user, heroIds[i]);
        }
    }

    function updateBaseURI(string memory _uri) external onlyRole(OWNER_ROLE) {
        require(bytes(_uri).length != 0, "invalid URI");
        baseURI = _uri;
    }
    /**
    Utility function
    */
    function decodeParams(bytes calldata data) internal pure returns (string memory) {
        return abi.decode(data, (string));
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseURI;
    }
}
