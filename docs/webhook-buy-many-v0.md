### Webhook Signature

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

### Webhook Buy Many

- Version: `1`
- Endpoint: `{game_endpoint}/sold`
- Method: `POST`
- Headers:

| Name          |      Require?      |  Type |                                                                   Description |
|---------------|:-------------:|------:|------------------------------------------------------------------------------:|
| `x-signature` | [x] | `String` | sign `data` with [EIP-712 format](#eip-712-format), types depend on game info |

- Params:

| Name   | Require? |     Type |           Description |
|--------|:-------------:|---------:|----------------------:|
| `data` | [x] | `Object` | values of `Sold` type |

```json
{
  "Sold": [
    {
      "name": "newItemIds",
      "type": "uint256[]"
    },
    {
      "name": "player",
      "type": "address"
    },
    {
      "name": "heroes",
      "type": "HeroInfo[]"
    },
    {
      "name": "prices",
      "type": "uint256[]"
    },
    {
      "name": "expire",
      "type": "uint256"
    },
    {
      "name": "signature",
      "type": "bytes"
    },
    {
      "name": "tx",
      "type": "bytes"
    },
    {
      "name": "contract",
      "type": "address"
    },
    {
      "name": "logIndex",
      "type": "uint256"
    }
  ],
  "HeroInfo": [
    {
      "name": "name",
      "type": "string"
    },
    {
      "name": "military",
      "type": "uint256"
    },
    {
      "name": "sex",
      "type": "uint256"
    },
    {
      "name": "army",
      "type": "uint256"
    },
    {
      "name": "level",
      "type": "uint256"
    }
  ]
}
```
