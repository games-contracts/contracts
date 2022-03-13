## Flow
```mermaid
sequenceDiagram
dApp->>Game API: breeding(heroid1, heroid2, player_address)
Game API->>Game API: validate
Game API->>Sign Service:(1) breeding(tx, heroid1, heroid2, player_address, currency, price, tokenUri, expire)
Sign Service->>Game API: ok process
Sign Service->>Game API:(2) webhook (tx,signature)
Game API->>dApp: signature
dApp->>Contract: breeding(heroid1, heroid2, currency, price, tokenUri, expire, signature)
Contract->>dApp: newHero
Sign Service->>Game API:(3) Breeding(uint newItemId, string tokenUri, address user, uint parent1Id, uint parent2Id, address currency, uint price)
```
## SIGN SERVICE API

### 1. API Sign Services

- Version: `1`
- Endpoint: `{cv-endpoint}/v1/sign-services`
- Method: `POST`
- Params:

| Name        | Require? |      Type |                                                                      Description |
|-------------|:-------------:|----------:|---------------------------------------------------------------------------------:|
| `tx`        | [x] |  `String` |                                       Partner transaction id/hash (unique in DB) |
| `data`      | [x] |  `Object` |                                                                Data of signature |
| `type`      | [x] |  `String` |                                                                Type of signature |
| `contract`  | [x] | `Address` |                                                Contract address verify signature |
| `signature` | [x] |  `String` | sign `Payload` with [EIP-712 format](#eip-712-format), types depend on game info |

- Response: `JSON Object`

| Name        |   Type   |              Description |
|-------------|:--------:|-------------------------:|
| `error_code` | `Number` | 0: success, others: fail |
| `messsage`  | `String` |         response message |

### 2. Webhook Signature

- Version: `1`
- Endpoint: `{game_endpoint}/signature-services`
- Method: `POST`
- Headers:

| Name          |      Require?      |  Type |                                      Description |
|---------------|:-------------:|------:|-------------------------------------------------:|
| `x-signature` | [x] | `String` | ethers.signMessage(`tx`) with server private key |

- Params:

| Name        | Require? |     Type |         Description |
|-------------|:-------------:|---------:|--------------------:|
| `tx`        | [x] | `String` |        `tx` of game |
| `data`      | [x] | `Object` | values of signature |
| `signature` | [x] | `String` |    signature for tx |

### 3. Webhook Breeding

- Version: `1`
- Endpoint: `{game_endpoint}/item-breeding`
- Method: `POST`
- Headers:

| Name          |      Require?      |  Type |                                                              Description |
|---------------|:-------------:|------:|-------------------------------------------------------------------------:|
| `x-signature` | [x] | `String` | sign `Breeding` with [EIP-712 format](#eip-712-format), types `BREEDING` |

- Params: `JSON Object`

| Name          |    Type     |         Description |
|---------------|:-----------:|--------------------:|
| `newItemId`       | `BigNumber` |     new id breeding |
| `tokenUri`      |  `string`  |      tokenuri of id |
| `user` | `address` |                user |
| `parent1Id`         |  `BigNumber`  |          token id 1 |
| `parent2Id`         |  `BigNumber`  |          token id 2 |
| `currency`         |  `BigNumber`  | Address of currency |
| `price`         |  `BigNumber`  |               price |
| `tx`          |  `String`   |    Transaction hash |

#### EIP-712 format

| Name               |                 Type                 |     Description |
|--------------------|:------------------------------------:|----------------:|
| `domain`           |               `Object`               |       CV define |
| `types`            |               `Object`               | Depends on Game |
| `value`            |               `Object`               |    Data to sign |

##### Types `BREEDING`

```json
{
  Info: [
    {
      name: "user",
      type: "address"
    },
    {
      name: "parent1Id",
      type: "uint256"
    },
    {
      name: "parent2Id",
      type: "uint256"
    },
    {
      name: "currency",
      type: "address"
    },
    {
      name: "price",
      type: "uint256"
    },
    {
      name: "tokenUri",
      type: "string"
    },
    {
      name: "expire",
      type: "uint256"
    }
  ],
  Payload: [
    {
      name: "tx",
      type: "string"
    },
    {
      name: "type",
      type: "string"
    },
    {
      name: "contract",
      type: "address"
    },
    {
      name: "data",
      type: "Info"
    }
  ]
}
```
