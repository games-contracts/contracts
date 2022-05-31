// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    string private baseURI;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
    }
    function mint(address user, uint tokenId) public {
        _mint(user, tokenId);
    }

    function mintMany(address user, uint[] calldata tokenIds) public {
        uint length = tokenIds.length;
        for (uint i; i < length; ++i) {
            _mint(user, tokenIds[i]);
        }
    }

    function mintMany(address user, uint fromId, uint toId) public {
        for (uint i = fromId; i <= toId; ++i) {
            _mint(user, i);
        }
    }

    function setBaseURI(string calldata uri) public {
        baseURI = uri;
    }

    function _baseURI() internal override view returns (string memory) {
        return baseURI;
    }
}
