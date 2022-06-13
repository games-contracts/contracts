## SIGN SERVICE

[[_TOC_]]

### API Sign Services

- Version: `1`
- Endpoint: `/sign-services`
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

### Webhook Sign Services

- Endpoint: `/sign-services`
- Method: `POST`
- Headers:

| Name          |   Type   |                                                  Description |
|---------------|:--------:|-------------------------------------------------------------:|
| `x-signature` | `String` |                                       sign `tx` with signers |

- Params:

| Name        | Require? |      Type |                                Description |
|-------------|:-------------:|----------:|-------------------------------------------:|
| `tx`        | [x] |  `String` | Partner transaction id/hash (unique in DB) |
| `data`      | [x] |  `Object` |                          Data of signature |
| `signature` | [x] |  `String` |                signature for request of tx |

#### EIP-712 format

| Name               |                 Type                 |     Description |
|--------------------|:------------------------------------:|----------------:|
| `domain`           |               `Object`               |            `{}` |
| `types`            |               `Object`               | Depends on Game |
| `value`            |               `Object`               |    Data to sign |

##### Types `CLAIM_HERO`

```json
{
  "Info": [
    {
      "name": "user",
      "type": "address"
    },
    {
      "name": "token",
      "type": "address"
    },
    {
      "name": "heroId",
      "type": "string"
    }
  ],
  "Payload": [
    {
      "name": "tx",
      "type": "string"
    },
    {
      "name": "type",
      "type": "string"
    },
    {
      "name": "contract",
      "type": "address"
    },
    {
      "name": "data",
      "type": "Info"
    }
  ]
}
```
##### Types `CLAIM_TOKEN`

```json
{
  "Info": [
    {
      "name": "user",
      "type": "address"
    },
    {
      "name": "token",
      "type": "address"
    },
    {
      "name": "amount",
      "type": "uint"
    }
  ],
  "Payload": [
    {
      "name": "tx",
      "type": "string"
    },
    {
      "name": "type",
      "type": "string"
    },
    {
      "name": "contract",
      "type": "address"
    },
    {
      "name": "data",
      "type": "Info"
    }
  ]
}
```
##### Domain

```json
{
  "chainId": 0,
  "name": "ChainVerse Signer",
  "version": "1",
  "verifyingContract": "0x0000000000000000000000000000000000000000"
}
```




