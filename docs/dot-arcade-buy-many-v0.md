### API sign for buy characters
- Version: `1`
- Endpoint: `/v1/dot-arcade/sign-services`
- Method: `POST`
- Authorization: Header `x-signature` or Payload `signature`
- Params:

| Name        | Require? |      Type |                                                                      Description |
|-------------|:-------------:|----------:|---------------------------------------------------------------------------------:|
| `tx`        | [x] |  `String` |                                       Partner transaction id/hash (unique in DB) |
| `data`      | [x] |  `Object` |                                                                Data of signature |
| `type`      | [x] |  `String` |                                                                Type of signature |
| `contract`  | [x] | `Address` |                                                Contract address verify signature |
| `signature` | [x] |  `String` | sign `Payload` with [EIP-712 format](#eip-712-format), types depend on game info |


- Response: `JSON Object`

| Name         |   Type   |             Description |
|--------------|:--------:|------------------------:|
| `error_code` | `Number` | Error code (0: success) |
| `message`    | `String` |                 Message |


#### EIP-712 format

| Name               |                 Type                 |     Description |
|--------------------|:------------------------------------:|----------------:|
| `domain`           |               `Object`               |       CV define |
| `types`            |               `Object`               | Depends on Game |
| `value`            |               `Object`               |    Data to sign |

##### Types `BUY_MANY`

```json
{
  "Hero": [
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
  ],
  "Info": [
    {
      "name": "player",
      "type": "address"
    },
    {
      "name": "prices",
      "type": "uint256[]"
    },
    {
      "name": "heroes",
      "type": "Hero[]"
    },
    {
      "name": "expire",
      "type": "uint256"
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

