/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ArenaBox, ArenaBoxInterface } from "../ArenaBox";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "boxId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
    ],
    name: "LogClaim",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "NFTContract",
    outputs: [
      {
        internalType: "contract INFTContract",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "OWNER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SIGNER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "boxId",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "boxId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "claim",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
    ],
    name: "mintMany",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_uri",
        type: "string",
      },
    ],
    name: "updateBaseURI",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nft",
        type: "address",
      },
    ],
    name: "updateNFTContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002b7838038062002b78833981016040819052620000349162000392565b8251839083906200004d90600090602085019062000239565b5080516200006390600190602084019062000239565b505081516200007b9150600890602084019062000239565b50620000b77fe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f7060008051602062002b5883398151915262000131565b620000f27f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a660008051602062002b5883398151915262000131565b6200010d60008051602062002b588339815191528062000131565b6200012860008051602062002b588339815191523362000185565b50505062000472565b600082815260066020526040902060010154819060405184907fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff90600090a460009182526006602052604090912060010155565b62000191828262000195565b5050565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff16620001915760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620001f53390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b82805462000247906200041f565b90600052602060002090601f0160209004810192826200026b5760008555620002b6565b82601f106200028657805160ff1916838001178555620002b6565b82800160010185558215620002b6579182015b82811115620002b657825182559160200191906001019062000299565b50620002c4929150620002c8565b5090565b5b80821115620002c45760008155600101620002c9565b600082601f830112620002f0578081fd5b81516001600160401b03808211156200030d576200030d6200045c565b604051601f8301601f19908116603f011681019082821181831017156200033857620003386200045c565b8160405283815260209250868385880101111562000354578485fd5b8491505b8382101562000377578582018301518183018401529082019062000358565b838211156200038857848385830101525b9695505050505050565b600080600060608486031215620003a7578283fd5b83516001600160401b0380821115620003be578485fd5b620003cc87838801620002df565b94506020860151915080821115620003e2578384fd5b620003f087838801620002df565b9350604086015191508082111562000406578283fd5b506200041586828701620002df565b9150509250925092565b600181811c908216806200043457607f821691505b602082108114156200045657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6126d680620004826000396000f3fe608060405234801561001057600080fd5b50600436106101cf5760003560e01c80636a62784211610104578063a217fddf116100a2578063d539139311610071578063d539139314610422578063d547741f14610449578063e58378bb1461045c578063e985e9c51461048357600080fd5b8063a217fddf146103e1578063a22cb465146103e9578063b88d4fde146103fc578063c87b56dd1461040f57600080fd5b806391d14854116100de57806391d1485414610366578063931688cb1461039f57806395d89b41146103b2578063a1ebf35d146103ba57600080fd5b80636a6278421461032d57806370a082311461034057806378627f2b1461035357600080fd5b80632f2ff15d1161017157806342842e0e1161014b57806342842e0e146102e157806342966c68146102f45780635e830656146103075780636352211e1461031a57600080fd5b80632f2ff15d146102a857806331c2273b146102bb57806336568abe146102ce57600080fd5b806308aa325f116101ad57806308aa325f1461023c578063095ea7b31461025d57806323b872dd14610272578063248a9ca31461028557600080fd5b806301ffc9a7146101d457806306fdde03146101fc578063081812fc14610211575b600080fd5b6101e76101e23660046122b8565b6104bf565b60405190151581526020015b60405180910390f35b6102046104d0565b6040516101f39190612555565b61022461021f36600461227e565b610562565b6040516001600160a01b0390911681526020016101f3565b61024f61024a36600461234e565b6105fc565b6040519081526020016101f3565b61027061026b366004612255565b61079f565b005b610270610280366004612167565b6108b5565b61024f61029336600461227e565b60009081526006602052604090206001015490565b6102706102b6366004612296565b61093c565b600954610224906001600160a01b031681565b6102706102dc366004612296565b610962565b6102706102ef366004612167565b6109ee565b61027061030236600461227e565b610a09565b610270610315366004612255565b610a6b565b61022461032836600461227e565b610ae2565b61024f61033b36600461211b565b610b6d565b61024f61034e36600461211b565b610bc8565b61027061036136600461211b565b610c62565b6101e7610374366004612296565b60009182526006602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6102706103ad3660046122f0565b610d06565b610204610d92565b61024f7fe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f7081565b61024f600081565b6102706103f736600461221b565b610da1565b61027061040a3660046121a2565b610e66565b61020461041d36600461227e565b610ef4565b61024f7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b610270610457366004612296565b610fdd565b61024f7fb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e81565b6101e7610491366004612135565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006104ca82611003565b92915050565b6060600080546104df9061260d565b80601f016020809104026020016040519081016040528092919081815260200182805461050b9061260d565b80156105585780601f1061052d57610100808354040283529160200191610558565b820191906000526020600020905b81548152906001019060200180831161053b57829003601f168201915b5050505050905090565b6000818152600260205260408120546001600160a01b03166105e05760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a20617070726f76656420717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084015b60405180910390fd5b506000908152600460205260409020546001600160a01b031690565b600061060b8686868686611028565b6106575760405162461bcd60e51b815260206004820152601160248201527f696e76616c6964207369676e617475726500000000000000000000000000000060448201526064016105d7565b6009546001600160a01b03166106af5760405162461bcd60e51b815260206004820152601060248201527f696e76616c696420636f6e74726163740000000000000000000000000000000060448201526064016105d7565b6106b886610a09565b600954604051637f6a041360e11b81526000916001600160a01b03169063fed40826906106ed9033908a908a90600401612516565b602060405180830381600087803b15801561070757600080fd5b505af115801561071b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061073f9190612336565b600954604080518a81523360208201526001600160a01b0390921690820152606081018290529091507f7386e4d10eb2c3ad57de0af569b8802691d74a6ec5779796d34de9d9045534649060800160405180910390a19695505050505050565b60006107aa82610ae2565b9050806001600160a01b0316836001600160a01b031614156108185760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084016105d7565b336001600160a01b038216148061083457506108348133610491565b6108a65760405162461bcd60e51b815260206004820152603860248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f74206f7760448201527f6e6572206e6f7220617070726f76656420666f7220616c6c000000000000000060648201526084016105d7565b6108b08383611142565b505050565b6108bf33826111b0565b6109315760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016105d7565b6108b08383836112a7565b600082815260066020526040902060010154610958813361145b565b6108b083836114db565b6001600160a01b03811633146109e05760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016105d7565b6109ea828261157d565b5050565b6108b083838360405180602001604052806000815250610e66565b610a1333826111b0565b610a5f5760405162461bcd60e51b815260206004820181905260248201527f63616c6c6572206973206e6f74206f776e6572206e6f7220617070726f76656460448201526064016105d7565b610a6881611600565b50565b60008111610abb5760405162461bcd60e51b815260206004820152601060248201527f696e76616c6964207175616e746974790000000000000000000000000000000060448201526064016105d7565b60005b818110156108b057610acf83610b6d565b5080610ada81612642565b915050610abe565b6000818152600260205260408120546001600160a01b0316806104ca5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a206f776e657220717565727920666f72206e6f6e657869737460448201527f656e7420746f6b656e000000000000000000000000000000000000000000000060648201526084016105d7565b60007f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6610b9a813361145b565b610ba8600780546001019055565b6000610bb360075490565b9050610bbf848261169b565b91505b50919050565b60006001600160a01b038216610c465760405162461bcd60e51b815260206004820152602a60248201527f4552433732313a2062616c616e636520717565727920666f7220746865207a6560448201527f726f20616464726573730000000000000000000000000000000000000000000060648201526084016105d7565b506001600160a01b031660009081526003602052604090205490565b7fb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e610c8d813361145b565b6001600160a01b038216610ce35760405162461bcd60e51b815260206004820152600f60248201527f696e76616c69642061646472657373000000000000000000000000000000000060448201526064016105d7565b50600980546001600160a01b0319166001600160a01b0392909216919091179055565b7fb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e610d31813361145b565b8151610d7f5760405162461bcd60e51b815260206004820152600b60248201527f696e76616c69642055524900000000000000000000000000000000000000000060448201526064016105d7565b81516108b0906008906020850190611fa9565b6060600180546104df9061260d565b6001600160a01b038216331415610dfa5760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016105d7565b3360008181526005602090815260408083206001600160a01b03871680855290835292819020805460ff191686151590811790915590519081529192917f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a35050565b610e7033836111b0565b610ee25760405162461bcd60e51b815260206004820152603160248201527f4552433732313a207472616e736665722063616c6c6572206973206e6f74206f60448201527f776e6572206e6f7220617070726f76656400000000000000000000000000000060648201526084016105d7565b610eee848484846117dd565b50505050565b6000818152600260205260409020546060906001600160a01b0316610f815760405162461bcd60e51b815260206004820152602f60248201527f4552433732314d657461646174613a2055524920717565727920666f72206e6f60448201527f6e6578697374656e7420746f6b656e000000000000000000000000000000000060648201526084016105d7565b6000610f8b611866565b90506000815111610fab5760405180602001604052806000815250610fd6565b80610fb584611875565b604051602001610fc6929190612434565b6040516020818303038152906040525b9392505050565b600082815260066020526040902060010154610ff9813361145b565b6108b0838361157d565b60006001600160e01b03198216637965db0b60e01b14806104ca57506104ca8261198f565b60008033878787306040516020016110449594939291906123f1565b60405160208183030381529060405280519060200120905060006110b5826040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b905060006110fb86868080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525086939250506119df9050565b6001600160a01b031660009081527fe0335de0884b696737b8af21e79cfe2b5e1054ef0720d3c55e99417bfa45b181602052604090205460ff169998505050505050505050565b600081815260046020526040902080546001600160a01b0319166001600160a01b038416908117909155819061117782610ae2565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000818152600260205260408120546001600160a01b03166112295760405162461bcd60e51b815260206004820152602c60248201527f4552433732313a206f70657261746f7220717565727920666f72206e6f6e657860448201526b34b9ba32b73a103a37b5b2b760a11b60648201526084016105d7565b600061123483610ae2565b9050806001600160a01b0316846001600160a01b0316148061126f5750836001600160a01b031661126484610562565b6001600160a01b0316145b8061129f57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b949350505050565b826001600160a01b03166112ba82610ae2565b6001600160a01b0316146113365760405162461bcd60e51b815260206004820152602960248201527f4552433732313a207472616e73666572206f6620746f6b656e2074686174206960448201527f73206e6f74206f776e000000000000000000000000000000000000000000000060648201526084016105d7565b6001600160a01b0382166113985760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016105d7565b6113a3600082611142565b6001600160a01b03831660009081526003602052604081208054600192906113cc9084906125b3565b90915550506001600160a01b03821660009081526003602052604081208054600192906113fa908490612568565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff166109ea57611499816001600160a01b03166014611aae565b6114a4836020611aae565b6040516020016114b5929190612463565b60408051601f198184030181529082905262461bcd60e51b82526105d791600401612555565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff166109ea5760008281526006602090815260408083206001600160a01b03851684529091529020805460ff191660011790556115393390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff16156109ea5760008281526006602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600061160b82610ae2565b9050611618600083611142565b6001600160a01b03811660009081526003602052604081208054600192906116419084906125b3565b909155505060008281526002602052604080822080546001600160a01b0319169055518391906001600160a01b038416907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a45050565b6001600160a01b0382166116f15760405162461bcd60e51b815260206004820181905260248201527f4552433732313a206d696e7420746f20746865207a65726f206164647265737360448201526064016105d7565b6000818152600260205260409020546001600160a01b0316156117565760405162461bcd60e51b815260206004820152601c60248201527f4552433732313a20746f6b656e20616c7265616479206d696e7465640000000060448201526064016105d7565b6001600160a01b038216600090815260036020526040812080546001929061177f908490612568565b909155505060008181526002602052604080822080546001600160a01b0319166001600160a01b03861690811790915590518392907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908290a45050565b6117e88484846112a7565b6117f484848484611c9d565b610eee5760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016105d7565b6060600880546104df9061260d565b6060816118995750506040805180820190915260018152600360fc1b602082015290565b8160005b81156118c357806118ad81612642565b91506118bc9050600a83612580565b915061189d565b60008167ffffffffffffffff8111156118ec57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611916576020820181803683370190505b5090505b841561129f5761192b6001836125b3565b9150611938600a8661265d565b611943906030612568565b60f81b81838151811061196657634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350611988600a86612580565b945061191a565b60006001600160e01b031982166380ac58cd60e01b14806119c057506001600160e01b03198216635b5e139f60e01b145b806104ca57506301ffc9a760e01b6001600160e01b03198316146104ca565b600080600080845160411415611a095750505060208201516040830151606084015160001a611a98565b845160401415611a505750505060408201516020830151907f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81169060ff1c601b01611a98565b60405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016105d7565b611aa486828585611e00565b9695505050505050565b60606000611abd836002612594565b611ac8906002612568565b67ffffffffffffffff811115611aee57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015611b18576020820181803683370190505b509050600360fc1b81600081518110611b4157634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110611b7e57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000611ba2846002612594565b611bad906001612568565b90505b6001811115611c4e577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110611bfc57634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110611c2057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93611c47816125f6565b9050611bb0565b508315610fd65760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105d7565b60006001600160a01b0384163b15611df557604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290611ce19033908990889088906004016124e4565b602060405180830381600087803b158015611cfb57600080fd5b505af1925050508015611d2b575060408051601f3d908101601f19168201909252611d28918101906122d4565b60015b611ddb573d808015611d59576040519150601f19603f3d011682016040523d82523d6000602084013e611d5e565b606091505b508051611dd35760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527f63656976657220696d706c656d656e746572000000000000000000000000000060648201526084016105d7565b805181602001fd5b6001600160e01b031916630a85bd0160e11b14905061129f565b506001949350505050565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0821115611e7d5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016105d7565b8360ff16601b1480611e9257508360ff16601c145b611ee95760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016105d7565b6040805160008082526020820180845288905260ff871692820192909252606081018590526080810184905260019060a0016020604051602081039080840390855afa158015611f3d573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b038116611fa05760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016105d7565b95945050505050565b828054611fb59061260d565b90600052602060002090601f016020900481019282611fd7576000855561201d565b82601f10611ff057805160ff191683800117855561201d565b8280016001018555821561201d579182015b8281111561201d578251825591602001919060010190612002565b5061202992915061202d565b5090565b5b80821115612029576000815560010161202e565b600067ffffffffffffffff8084111561205d5761205d61269d565b604051601f8501601f19908116603f011681019082821181831017156120855761208561269d565b8160405280935085815286868601111561209e57600080fd5b858560208301376000602087830101525050509392505050565b80356001600160a01b03811681146120cf57600080fd5b919050565b60008083601f8401126120e5578182fd5b50813567ffffffffffffffff8111156120fc578182fd5b60208301915083602082850101111561211457600080fd5b9250929050565b60006020828403121561212c578081fd5b610fd6826120b8565b60008060408385031215612147578081fd5b612150836120b8565b915061215e602084016120b8565b90509250929050565b60008060006060848603121561217b578081fd5b612184846120b8565b9250612192602085016120b8565b9150604084013590509250925092565b600080600080608085870312156121b7578081fd5b6121c0856120b8565b93506121ce602086016120b8565b925060408501359150606085013567ffffffffffffffff8111156121f0578182fd5b8501601f81018713612200578182fd5b61220f87823560208401612042565b91505092959194509250565b6000806040838503121561222d578182fd5b612236836120b8565b91506020830135801515811461224a578182fd5b809150509250929050565b60008060408385031215612267578182fd5b612270836120b8565b946020939093013593505050565b60006020828403121561228f578081fd5b5035919050565b600080604083850312156122a8578182fd5b8235915061215e602084016120b8565b6000602082840312156122c9578081fd5b8135610fd6816126b3565b6000602082840312156122e5578081fd5b8151610fd6816126b3565b600060208284031215612301578081fd5b813567ffffffffffffffff811115612317578182fd5b8201601f81018413612327578182fd5b61129f84823560208401612042565b600060208284031215612347578081fd5b5051919050565b600080600080600060608688031215612365578283fd5b85359450602086013567ffffffffffffffff80821115612383578485fd5b61238f89838a016120d4565b909650945060408801359150808211156123a7578283fd5b506123b4888289016120d4565b969995985093965092949392505050565b600081518084526123dd8160208601602086016125ca565b601f01601f19169290920160200192915050565b60006bffffffffffffffffffffffff19808860601b1683528660148401528486603485013760609390931b90921692016034810192909252506048019392505050565b600083516124468184602088016125ca565b83519083019061245a8183602088016125ca565b01949350505050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161249b8160178501602088016125ca565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516124d88160288401602088016125ca565b01602801949350505050565b60006001600160a01b03808716835280861660208401525083604083015260806060830152611aa460808301846123c5565b6001600160a01b038416815260406020820152816040820152818360608301376000818301606090810191909152601f909201601f1916010192915050565b602081526000610fd660208301846123c5565b6000821982111561257b5761257b612671565b500190565b60008261258f5761258f612687565b500490565b60008160001904831182151516156125ae576125ae612671565b500290565b6000828210156125c5576125c5612671565b500390565b60005b838110156125e55781810151838201526020016125cd565b83811115610eee5750506000910152565b60008161260557612605612671565b506000190190565b600181811c9082168061262157607f821691505b60208210811415610bc257634e487b7160e01b600052602260045260246000fd5b600060001982141561265657612656612671565b5060010190565b60008261266c5761266c612687565b500690565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052601260045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160e01b031981168114610a6857600080fdfea164736f6c6343000804000ab19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e";

export class ArenaBox__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _name: string,
    _symbol: string,
    _uri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ArenaBox> {
    return super.deploy(
      _name,
      _symbol,
      _uri,
      overrides || {}
    ) as Promise<ArenaBox>;
  }
  getDeployTransaction(
    _name: string,
    _symbol: string,
    _uri: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_name, _symbol, _uri, overrides || {});
  }
  attach(address: string): ArenaBox {
    return super.attach(address) as ArenaBox;
  }
  connect(signer: Signer): ArenaBox__factory {
    return super.connect(signer) as ArenaBox__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ArenaBoxInterface {
    return new utils.Interface(_abi) as ArenaBoxInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ArenaBox {
    return new Contract(address, _abi, signerOrProvider) as ArenaBox;
  }
}
