/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ClaimToken, ClaimTokenInterface } from "../ClaimToken";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_claimToken",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Claim",
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
        indexed: false,
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "UsedSignature",
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
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "expire",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimToken",
    outputs: [
      {
        internalType: "contract IERC20",
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
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "claimedToken",
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
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "sendTo",
        type: "address",
      },
    ],
    name: "forceReturnERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sendTo",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "forceReturnERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "sendTo",
        type: "address",
      },
    ],
    name: "forceReturnNative",
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
    name: "totalClaim",
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
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "wasClaimed",
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
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001792380380620017928339810160408190526200003491620001df565b6001600160a01b0381166200004857600080fd5b600180546001600160a01b0319166001600160a01b0383161790556200009e7fe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f7060008051602062001772833981519152620000db565b620000b96000805160206200177283398151915280620000db565b620000d460008051602062001772833981519152336200012f565b506200020f565b600082815260208190526040902060010154819060405184907fbd79b86ffe0ab8e8776151514217cd7cacd52c909f66475c3af44e129f0b00ff90600090a460009182526020829052604090912060010155565b6200013b82826200013f565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166200013b576000828152602081815260408083206001600160a01b03851684529091529020805460ff191660011790556200019b3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600060208284031215620001f1578081fd5b81516001600160a01b038116811462000208578182fd5b9392505050565b611553806200021f6000396000f3fe60806040526004361061012d5760003560e01c8063547d1864116100a5578063a1ebf35d11610074578063aab0571711610059578063aab05717146103e7578063d547741f14610407578063e58378bb1461042757600080fd5b8063a1ebf35d1461039e578063a217fddf146103d257600080fd5b8063547d1864146102f7578063606e78ef1461030d57806374b226471461033a57806391d148541461035a57600080fd5b80632ada8a32116100fc57806336568abe116100e157806336568abe1461027f5780634451d89f1461029f5780634977182b146102d757600080fd5b80632ada8a321461023d5780632f2ff15d1461025f57600080fd5b806301ffc9a71461013957806306fdde031461016e57806320eacc12146101c4578063248a9ca3146101ff57600080fd5b3661013457005b600080fd5b34801561014557600080fd5b50610159610154366004611349565b61045b565b60405190151581526020015b60405180910390f35b34801561017a57600080fd5b506101b76040518060400160405280601281526020017f41445420436c61696d20436f6e7472616374000000000000000000000000000081525081565b6040516101659190611475565b3480156101d057600080fd5b506101596101df366004611371565b805160208183018101805160038252928201919093012091525460ff1681565b34801561020b57600080fd5b5061022f61021a366004611302565b60009081526020819052604090206001015490565b604051908152602001610165565b34801561024957600080fd5b5061025d610258366004611281565b610492565b005b34801561026b57600080fd5b5061025d61027a36600461131a565b610647565b34801561028b57600080fd5b5061025d61029a36600461131a565b610672565b3480156102ab57600080fd5b506001546102bf906001600160a01b031681565b6040516001600160a01b039091168152602001610165565b3480156102e357600080fd5b5061025d6102f2366004611200565b6106fe565b34801561030357600080fd5b5061022f60025481565b34801561031957600080fd5b5061022f6103283660046111e4565b60046020526000908152604090205481565b34801561034657600080fd5b5061025d61035536600461131a565b610797565b34801561036657600080fd5b5061015961037536600461131a565b6000918252602082815260408084206001600160a01b0393909316845291905290205460ff1690565b3480156103aa57600080fd5b5061022f7fe2f4eaae4a9751e85a3e4a7b9587827a877f29914755229b07a7b2da98285f7081565b3480156103de57600080fd5b5061022f600081565b3480156103f357600080fd5b5061025d610402366004611240565b61086b565b34801561041357600080fd5b5061025d61042236600461131a565b61091f565b34801561043357600080fd5b5061022f7fb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e81565b60006001600160e01b03198216637965db0b60e01b148061048c57506301ffc9a760e01b6001600160e01b03198316145b92915050565b61049e84848484610945565b6104ef5760405162461bcd60e51b815260206004820152600f60248201527f77726f6e67207369676e6174757265000000000000000000000000000000000060448201526064015b60405180910390fd5b60015460405163a9059cbb60e01b8152336004820152602481018590526000916001600160a01b03169063a9059cbb90604401602060405180830381600087803b15801561053c57600080fd5b505af1158015610550573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057491906112e2565b9050806105c35760405162461bcd60e51b815260206004820152601960248201527f7472616e73666572207374617475732069732066616c73652e0000000000000060448201526064016104e6565b83600260008282546105d59190611488565b90915550506001600160a01b03851660009081526004602052604081208054869290610602908490611488565b909155505060408051338152602081018690527f47cee97cb7acd717b3c0aa1435d004cd5b3c8c57d70dbceb4e4458bbd60e39d4910160405180910390a15050505050565b6000828152602081905260409020600101546106638133610b54565b61066d8383610bd2565b505050565b6001600160a01b03811633146106f05760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016104e6565b6106fa8282610c70565b5050565b7fb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e6107298133610b54565b6040516323b872dd60e01b81523060048201526001600160a01b038581166024830152604482018490528416906323b872dd90606401600060405180830381600087803b15801561077957600080fd5b505af115801561078d573d6000803e3d6000fd5b5050505050505050565b7fb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e6107c28133610b54565b6000826001600160a01b03168460405160006040518083038185875af1925050503d806000811461080f576040519150601f19603f3d011682016040523d82523d6000602084013e610814565b606091505b50509050806108655760405162461bcd60e51b815260206004820152600f60248201527f7769746864726177206661696c6564000000000000000000000000000000000060448201526064016104e6565b50505050565b7fb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e6108968133610b54565b60405163a9059cbb60e01b81526001600160a01b0383811660048301526024820185905285169063a9059cbb90604401602060405180830381600087803b1580156108e057600080fd5b505af11580156108f4573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061091891906112e2565b5050505050565b60008281526020819052604090206001015461093b8133610b54565b61066d8383610c70565b6000824211156109975760405162461bcd60e51b815260206004820152601060248201527f7369676e6174757265206578706972650000000000000000000000000000000060448201526064016104e6565b6003826040516109a791906113d8565b9081526040519081900360200190205460ff1615610a075760405162461bcd60e51b815260206004820152601560248201527f7369676e61747572652077617320636c61696d6564000000000000000000000060448201526064016104e6565b6001600383604051610a1991906113d8565b9081526040805160209281900383018120805460ff1916941515949094179093556bffffffffffffffffffffffff19606089811b821684860152603485018990526054850188905230901b166074840152805180840360680181526088840182528051908301207f19457468657265756d205369676e6564204d6573736167653a0a33320000000060a885015260c48085018290528251808603909101815260e4909401909152825192909101919091206000610ad68286610cef565b90507f8c12add2c0f515b04a197676a5354bcc2a36728b6a00e19afdad7592e0df76e285604051610b079190611475565b60405180910390a16001600160a01b031660009081527f059f08e7d7ba1c82eddc57afae67f80df851baf38a099607a779825038c3ce5b602052604090205460ff16979650505050505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166106fa57610b90816001600160a01b03166014610dbe565b610b9b836020610dbe565b604051602001610bac9291906113f4565b60408051601f198184030181529082905262461bcd60e51b82526104e691600401611475565b6000828152602081815260408083206001600160a01b038516845290915290205460ff166106fa576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610c2c3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16156106fa576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600080600080845160411415610d195750505060208201516040830151606084015160001a610da8565b845160401415610d605750505060408201516020830151907f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81169060ff1c601b01610da8565b60405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e6774680060448201526064016104e6565b610db486828585610fb4565b9695505050505050565b60606000610dcd8360026114a0565b610dd8906002611488565b67ffffffffffffffff811115610dfe57634e487b7160e01b600052604160045260246000fd5b6040519080825280601f01601f191660200182016040528015610e28576020820181803683370190505b509050600360fc1b81600081518110610e5157634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a905350600f60fb1b81600181518110610e8e57634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053506000610eb28460026114a0565b610ebd906001611488565b90505b6001811115610f5e577f303132333435363738396162636465660000000000000000000000000000000085600f1660108110610f0c57634e487b7160e01b600052603260045260246000fd5b1a60f81b828281518110610f3057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a90535060049490941c93610f57816114eb565b9050610ec0565b508315610fad5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016104e6565b9392505050565b60007f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08211156110315760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c604482015261756560f01b60648201526084016104e6565b8360ff16601b148061104657508360ff16601c145b61109d5760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c604482015261756560f01b60648201526084016104e6565b6040805160008082526020820180845288905260ff871692820192909252606081018590526080810184905260019060a0016020604051602081039080840390855afa1580156110f1573d6000803e3d6000fd5b5050604051601f1901519150506001600160a01b0381166111545760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e6174757265000000000000000060448201526064016104e6565b95945050505050565b600082601f83011261116d578081fd5b813567ffffffffffffffff8082111561118857611188611518565b604051601f8301601f19908116603f011681019082821181831017156111b0576111b0611518565b816040528381528660208588010111156111c8578485fd5b8360208701602083013792830160200193909352509392505050565b6000602082840312156111f5578081fd5b8135610fad8161152e565b600080600060608486031215611214578182fd5b833561121f8161152e565b9250602084013561122f8161152e565b929592945050506040919091013590565b600080600060608486031215611254578283fd5b833561125f8161152e565b92506020840135915060408401356112768161152e565b809150509250925092565b60008060008060808587031215611296578081fd5b84356112a18161152e565b93506020850135925060408501359150606085013567ffffffffffffffff8111156112ca578182fd5b6112d68782880161115d565b91505092959194509250565b6000602082840312156112f3578081fd5b81518015158114610fad578182fd5b600060208284031215611313578081fd5b5035919050565b6000806040838503121561132c578182fd5b82359150602083013561133e8161152e565b809150509250929050565b60006020828403121561135a578081fd5b81356001600160e01b031981168114610fad578182fd5b600060208284031215611382578081fd5b813567ffffffffffffffff811115611398578182fd5b6113a48482850161115d565b949350505050565b600081518084526113c48160208601602086016114bf565b601f01601f19169290920160200192915050565b600082516113ea8184602087016114bf565b9190910192915050565b7f416363657373436f6e74726f6c3a206163636f756e742000000000000000000081526000835161142c8160178501602088016114bf565b7f206973206d697373696e6720726f6c652000000000000000000000000000000060179184019182015283516114698160288401602088016114bf565b01602801949350505050565b602081526000610fad60208301846113ac565b6000821982111561149b5761149b611502565b500190565b60008160001904831182151516156114ba576114ba611502565b500290565b60005b838110156114da5781810151838201526020016114c2565b838111156108655750506000910152565b6000816114fa576114fa611502565b506000190190565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fd5b6001600160a01b038116811461154357600080fd5b5056fea164736f6c6343000804000ab19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e";

export class ClaimToken__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _claimToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ClaimToken> {
    return super.deploy(_claimToken, overrides || {}) as Promise<ClaimToken>;
  }
  getDeployTransaction(
    _claimToken: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_claimToken, overrides || {});
  }
  attach(address: string): ClaimToken {
    return super.attach(address) as ClaimToken;
  }
  connect(signer: Signer): ClaimToken__factory {
    return super.connect(signer) as ClaimToken__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ClaimTokenInterface {
    return new utils.Interface(_abi) as ClaimTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ClaimToken {
    return new Contract(address, _abi, signerOrProvider) as ClaimToken;
  }
}
