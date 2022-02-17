// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Log is ERC721 {

    constructor() ERC721("Log", "Log") {
    }
//    event Sold(uint256 newItemId, uint256 boxTypeId, uint256 price, address user, address agency);
    //
    //    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721) returns (bool) {
    //        return super.supportsInterface(interfaceId);
    //    }
    //
    //    function buy(uint256 boxTypeId, bytes32[] calldata merkleProof, address agency) public returns (uint256) {
    //        _mint(0x9741DeDd699D484fa5b34BA3Be064B9A533A3Bef, 1);
    //        emit Sold(1, 2, 200 * 10 ** 18, 0x9741DeDd699D484fa5b34BA3Be064B9A533A3Bef, address(0));
    //        return 1;
    //    }

}
