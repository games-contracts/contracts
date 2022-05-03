## MARKET API

[[_TOC_]]

### API List Items Listing On Market
> Description: This is API get list items listing on market

- Version: `{1.0}`
- Endpoint: `/v1/partner/{partner_id}/market/tokens`
- Authentication: None
- Method: `GET`

- Path Parameters:

| Name         | Require? |     Type | Description |
|--------------|:--------:|---------:|------------:|
| `partner_id` |   [x]    | `String` |  Partner Id |

- Query Parameters:

| Name                  | Require? |                      Type |         Description |
|-----------------------|:--------:|--------------------------:|--------------------:|
| `page`                |          |                  `Number` | This is page number |
| `page_size`           |          |                  `Number` |   This is page size |
| `name`                |          |                  `String` |        Name of item |
| `currency`            |          |                  `String` |      Currency token |
| `price_min`           |          |                  `Number` |           Price min |
| `price_max`           |          |                  `Number` |           Price max |

- Response: `JSON Object`

| Name                            |        Type         |         Description |
|---------------------------------|:-------------------:|--------------------:|
| `error_code`                    |      `Number`       |          Error code | 
| `message`                       |      `String`       |    Message response |
| `data`                          |    `Json Object`    |       Data Response | 
| `data.count`                    |      `Number`       |         Total items | 
| `data.rows`                     |   `Array Object`    |          List items | 
| `data.rows[].token_id`          |      `String`       |              Nft id |
| `data.rows[].name`              |      `String`       |            Nft name |
| `data.rows[].owner`             |      `String`       |    Nft owner listed |
| `data.rows[].price`             |      `Number`       |           Nft price |
| `data.rows[].attributes`        |      `String`       |      Nft attributes |
| `data.rows[].listing_id`        |      `Number`       |          listing id |
| `data.rows[].nft`               |      `String`       |        Nft contract | 
| `data.rows[].auction`           | [Auction](#auction) | Nft state on market | 
| `data.rows[].image`             |      `String`       |           Nft image | 
| `data.rows[].image_preview`     |      `String`       |   Nft image preview | 
| `data.rows[].currency`          |      `Object`       |      Nft categories | 
| `data.rows[].currency.currency` |      `String`       |    Currency address | 
| `data.rows[].currency.decimal`  |      `Number`       |    Currency decimal | 
| `data.rows[].currency.symbol`   |      `String`       |     Currency symbol | 

### API Get Info Item
> Description: This is API get info item

- Version: `{1.0}`
- Endpoint: `/v1/partner/{partner_id}/token/{token_contract}/{token_id}
- Authentication: None
- Method: `GET`
- Path Parameters:

| Name             | Require? |     Type |  Description |
|------------------|:--------:|---------:|-------------:|
| `partner_id`     |   [x]    | `String` |   Partner Id |
| `token_contract` |   [x]    | `String` | Nft contract |
| `token_id`       |   [x]    | `Number` |     Token Id |

- Response: `JSON Object`

| Name                          |        Type         |                                   Description |
|-------------------------------|:-------------------:|----------------------------------------------:|
| `error_code`                  |      `Number`       |                                    Error code | 
| `message`                     |      `String`       |                              Message response | 
| `data`                        |    `Json Object`    |                                 Data Response |
| `data.owner`                  |      `Object`       |                                     Owner nft |
| `data.owner.address`          |      `String`       |                                 Owner address |
| `data.owner.username`         |      `String`       |                                    Owner name |
| `data.owner.avatar`           |      `String`       |                                  Owner avatar | 
| `data.token_id`               |      `String`       |                                        Nft id |
| `data.name`                   |      `String`       |                                      Nft name |
| `data.price`                  |      `Number`       |                                     Nft price |
| `data.image`                  |      `String`       |                                     Nft image |
| `data.image_preview`          |      `String`       |                             Nft image preview |
| `data.attributes`             |      `String`       |                                Nft attributes |
| `data.nft`                    |      `String`       |                                  Nft contract | 
| `data.auction`                | [Auction](#auction) |                           Nft state on market | 
| `data.listing_id`             |      `Number`       |                                Nft listing id | 
| `data.attributes`             |      `String`       |                                Nft attributes |
| `data.bids`                   |   `Array Object`    |                                      Nft bids | 
| `data.bids[].price`           |      `Number`       |                                     Price bid |
| `data.bids[].bid_at`          |      `String`       |                                      Time bid |
| `data.bids[].bidder`          |      `Object`       |                                   Bidder info |
| `data.bids[].bidder.address`  |      `String`       |                                Bidder address |
| `data.bids[].bidder.username` |      `String`       |                                   Bidder name |
| `data.bids[].bidder.avatar`   |      `String`       |                                 Bidder avatar |
| `data.histories`              |   `Array Object`    |                                 Nft histories | 
| `data.histories[].event`      |      `String`       |                                     Nft event |
| `data.histories[].from`       |      `String`       |                             User address send |
| `data.histories[].to`         |      `String`       |                        User address recipient |
| `data.histories[].price`      |      `String`       |                                         Price |
| `data.histories[].currency`   |      `String`       |                                      Currency |
| `data.histories[].created_at` |      `String`       |                            History created at |
| `data.network`                |      `Object`       |                                   Nft network | 
| `data.network.network`        |      `String`       |                                  Network name |
| `data.network.chain_id`       |      `Number`       |                                      Chain id |
| `data.network.name`           |      `String`       |                                  Network name |
| `data.status`                 |      `String`       | Nft status on market (PUBLISH or PRE_PUBLISH) | 
| `data.nft_supported`          |      `Boolean`      |                          Nft market supported | 
| `data.currency`               |      `Object`       |                                Nft categories | 
| `data.currency.currency`      |      `String`       |                              Currency address | 
| `data.currency.decimal`       |      `Number`       |                              Currency decimal | 
| `data.currency.symbol`        |      `String`       |                               Currency symbol |

### API List Token By Wallet Address
> Description: This is API list token by Wallet Address

- Version: `{1.0}`
- Endpoint: `/v1/partner/asset/tokens`
- Authentication: [Signature Partner](#signature-partner)
- Method: `GET`
- PathParameters: None

- Query Parameters: None

| Name     | Require? |     Type      |                Description |
|----------|:--------:|:-------------:|---------------------------:|
| `nft`    |          |   `String`    |       Nft contract address |
| `nfts.*` |          |    `Array`    | List Nfts contract address |


- Response: `JSON Object`

| Name                            |               Type               |            Description |
|---------------------------------|:--------------------------------:|-----------------------:|
| `error_code`                    |             `Number`             |             Error code | 
| `message`                       |             `String`             |       Message response | 
| `data`                          |             `Object`             |          Data Response | 
| `data.count`                    |             `Number`             |            Total items | 
| `data.rows`                     |          `Array Object`          |                  Items | 
| `data.rows[].id`                |             `Number`             |                     Id | 
| `data.rows[].nft`               |             `String`             |              Nft token | 
| `data.rows[].token_id`          |             `Number`             |               Token id | 
| `data.rows[].listing_id`        |             `Number`             |             listing id |
| `data.rows[].name`              |             `String`             |          Name of token | 
| `data.rows[].price`             |             `Number`             |         price of token | 
| `data.rows[].image`             |             `String`             |         Image of token | 
| `data.rows[].asset`             |             `String`             |         Asset of token | 
| `data.rows[].image_preview`     |             `String`             | Image preview of token | 
| `data.rows[].attribute`         |             `String`             | Image preview of token | 
| `data.rows[].status`            | [Status](#status-item-on-market) |        Status of token |
| `data.rows[].currency`          |             `Object`             |               Currency | 
| `data.rows[].currency.currency` |             `String`             |       Currency address | 
| `data.rows[].currency.decimal`  |             `Number`             |       Currency decimal | 
| `data.rows[].currency.symbol`   |             `String`             |        Currency symbol |  
| `data.rows[].created_at`        |             `String`             |             Created at | 

### API Check User Register Whitelist IGO
> Description: This is API check User register whitelist IGO

- Version: `{1.0}`
- Endpoint: `/v1/partner/whitelist-igo/{igo}`
- Authentication: [Signature Partner](#signature-partner)
- Method: `GET`
- Path Parameters:

| Name  | Require? |     Type |               Description |
|-------|:--------:|---------:|--------------------------:|
| `igo` |   [x]    | `String` | Igo pool contract address |

- Response: `JSON Object`

| Name          |                   Type                   |          Description |
|---------------|:----------------------------------------:|---------------------:|
| `error_code`  |                 `Number`                 |           Error code |
| `message`     |                 `String`                 |     Message response |
| `data`        |              `Json Object`               |        Data Response |
| `data.status` | [Status](#status-register-whitelist-igo) | Status whitelist IGO |

### API Get Nonce
> Description: This is API partner get nonce vs time to create message signature
- Version: `{1.0}`
- Endpoint: `/v1/partner/nonce`
- Authentication: `Headers`

| Name        |   Type   |    Description |
|-------------|:--------:|---------------:|
| `x-address` | `String` | `User address` |
| `x-partner` | `String` |   `Partner Id` |

- Method: `GET`
- Params: None
- Response: `JSON Object`

| Name           |   Type   |      Description |
|----------------|:--------:|-----------------:|
| `error_code`   | `Number` |       Error code |
| `message`      | `String` | Message response |
| `data`         | `Object` |    Data response |
| `data.nonce`   | `Number` |            Nonce |
| `data.time`    | `Number` |             Time |

### API Register Whitelist IGO
> Description: This is API partner register whitelist IGO
- Version: `{1.0}`
- Endpoint: `/v1/partner/whitelist-igo`
- Method: `POST`
- Authentication: [Signature Partner](#signature-partner)

- Body Parameters:

| Name     | Require? |     Type |    Description |
|----------|:--------:|---------:|---------------:|
| `igo_id` |   [x]    | `String` |         IGO id |
| `name`   |   [x]    | `String` |       Username |
| `email`  |   [x]    | `String` | Email register |

- Response: `JSON Object`

| Name           |                Type                 |      Description |
|----------------|:-----------------------------------:|-----------------:|
| `error_code`   | [Reg Code](#register-whitelist-igo) |       Error code |
| `message`      |              `String`               | Message response |
| `data`         |              `Object`               |    Data response |
| `data.status`  |     [Status](#response-status)      |  Status register |

### API Get List Games IGO
> Description: This is API Get List Games IGO

- Version: `{1.0}`
- Endpoint: `/v1/partner/{partner_id}/games`
- Authentication: None
- Method: `GET`
- Query Parameters:

| Name        | Require? |                 Type |                       Description |
|-------------|:--------:|---------------------:|----------------------------------:|
| `pools`     |          | `Array Pool Address` |                List pools address |
| `type`      |          |    [Type](#igo-type) |                       Type of IGO |

- Path Parameters:

| Name         | Require? |     Type | Description |
|--------------|:--------:|---------:|------------:|
| `partner_id` |   [x]    | `String` |  Partner id |

- Response: `JSON Object`

| Name         |           Type            |      Description |
|--------------|:-------------------------:|-----------------:|
| `error_code` |         `Number`          |       Error code |
| `message`    |         `String`          | Message response |
| `data`       |       `Json Object`       |    Data Response |
| `data.count` |         `Number`          |      Total Games |
| `data.next`  | [Array Object](#game-igo) |  List Games next |
| `data.open`  | [Array Object](#game-igo) |  List Games open |
| `data.end`   | [Array Object](#game-igo) |   List Games end |

## Type
### Signature Partner
- Headers:

| Name              |   Type   |                             Description |
|-------------------|:--------:|----------------------------------------:|
| `x-address`       | `String` |                          `User address` |
| `x-token`         | `String` |                         `Token captcha` |
| `x-signature`     | `String` | `Signature sign with message get nonce` |
| `x-partner`       | `String` |                            `Partner Id` |
| `x-nonce`         | `String` |                       `Nonce ChaiVerse` |
| `x-partner-nonce` | `String` |                         `Nonce Partner` |

### Attributes
| Name           | Require? |     Type |                                                                                                                                        Description |
|----------------|:--------:|---------:|---------------------------------------------------------------------------------------------------------------------------------------------------:|
| `display_type` |   [x]    | `String` | If you don't want to have a trait_type for a particular trait, you can include just a value in the trait and it will be set as a generic property. |
| `trait_type`   |   [x]    |   `Enum` |                                                                                                      number, date, boost_number, boost_percentage. |
| `value`        |   [x]    |    `Any` |                                                                                                                                Value of attribute. |

### Game Igo
| value                    |           Type            |                   Description |
|--------------------------|:-------------------------:|------------------------------:|
| `id`                     |         `String`          |                        IGO id |
| `nft`                    |         `String`          |          NFT contract address |
| `title`                  |         `String`          |                    Game title |
| `thumbnail`              |         `String`          |                Game thumbnail |
| `logo`                   |         `String`          |                     Game logo |
| `background`             |         `String`          |               Game background |
| `pin`                    |         `Boolean`         |                      Game Pin |
| `description`            |         `String`          |              Game description |
| `about`                  |         `String`          |                    Game about |
| `start_register`         |         `Number`          | Start time register whitelist |
| `end_register`           |         `Number`          |   End time register whitelist |
| `start_sell`             |         `Number`          |           Start time sale NFT |
| `end_sell`               |         `Number`          |             End time sale NFT |
| `type`                   |     [Type](#igo-type)     |                   Type of IGO |
| `max_bought`             |         `Number`          |                Max bought NFT |
| `extra_data`             | [extra_data](#extra-data) |               Game extra data |
| `currency_info`          |         `Object`          |                 Currency sell |
| `currency_info.currency` |         `String`          |              Currency address |
| `currency_info.symbol`   |         `String`          |               Currency symbol |
| `currency_info.decimal`  |         `Number`          |              Currency decimal |
| `network_info`           |         `Object`          |                   Igo network |
| `network_info.network`   |         `String`          |                  Network name |
| `network_info.chain_id`  |         `Number`          |                      Chain id |
| `network_info.name`      |         `String`          |                  Network name |
| `socials`                |      `Array Object`       |               Socials of game |
| `socials[].key`          |     [Social](#social)     |                    Social key |
| `socials[].value`        |         `String`          |                  Social value |

### Social
| value      |   Type   |        Description |
|------------|:--------:|-------------------:|
| `website`  | `String` |  `website url key` | 
| `twitter`  | `String` |  `twitter url key` | 
| `discord`  | `String` |  `discord url key` | 
| `telegram` | `String` | `telegram url key` | 
| `facebook` | `String` | `facebook url key` | 

### Extra data
> Description: extra data is in the form string. you need to convert to JSON.parse

| value                    |      Type      |          Description |
|--------------------------|:--------------:|---------------------:|
| `min_price_range`        |    `Number`    | Game min price range |
| `max_price_range`        |    `Number`    | Game max price range |
| `rules`                  |    `String`    |           Game rules |
| `box_info`               | `Array Object` |            Types box |
| `box_info[].item_type`   |    `Number`    |             Type box |
| `box_info[].name`        |    `String`    |            Type name |
| `box_info[].price`       |    `Number`    |            Price box |
| `box_info[].total`       |    `Number`    |    Total box of type |
| `box_info[].attributes`  |    `String`    |       Attributes box |
| `box_info[].image`       |    `String`    |            Image box |
| `box_info[].probability` |    `Number`    |      Probability box |
| `box_info[].token_uri`   |    `String`    |        Token Uri box |

### Status Item On Market
| value         |   Type   |                 Description |
|---------------|:--------:|----------------------------:|
| `PENDING`     | `String` |         `Processing listed` | 
| `PRE_PUBLISH` | `String` | `PREVIEW PUBLISH on market` |
| `PUBLISH`     | `String` |         `PUBLISH on market` |
| `LISTING`     | `String` |            `LISTING action` |
| `AUCTION`     | `String` |            `AUCTION action` |


## Enum
### Status
| value |   Type   | Description |
|-------|:--------:|------------:|
| `1`   | `number` |    `Active` | 
| `0`   | `number` |  `InActive` | 

### Sorting
| value  |   Type   |        Description |
|--------|:--------:|-------------------:|
| `ASC`  | `string` |   `Ascending sort` | 
| `DESC` | `string` |  `Descending sort` | 

### Sorting By
| value     |   Type   |            Description |
|-----------|:--------:|-----------------------:|
| `price`   | `string` |        `Sort by price` | 
| `listing` | `string` | `Sort by listing time` | 

### Response Status
| value |   Type   | Description |
|-------|:--------:|------------:|
| `1`   | `number` |   `Success` | 
| `0`   | `number` |     `Error` | 

### Auction
| value   |   Type    |         Description |
|---------|:---------:|--------------------:|
| `true`  | `Boolean` | `Auction on market` | 
| `false` | `Boolean` | `Listing on market` |

### Status Register Whitelist IGO
| value |   Type   |                   Description |
|-------|:--------:|------------------------------:|
| `0`   | `Number` | `User not register whitelist` | 
| `853` | `Number` |         `User verified email` |
| `858` | `Number` |               `User registed` |

### IGO Type
| value |   Type   |      Description |
|-------|:--------:|-----------------:|
| `0`   | `number` |        `Default` | 
| `1`   | `number` |            `Box` | 
| `2`   | `number` | `Box Minted NFT` |
