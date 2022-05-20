#### Item: JSON Object

| Name   |   Type | Description |
|----------|:------:|------:|
| id | String | This is the id unique of the item. |
| image | String | This is the URL to the image of the item. Can be just about any type of image (including SVGs, which will be cached into PNGs by NFT Market, and even MP4s), and can be IPFS URLs or paths. We recommend using a 350 x 350 image. |
| image_data | String | Raw SVG image data, if you want to generate images on the fly (not recommended). Only use this if you're not including the image parameter.|
| external_url  | String | This is the URL that will appear below the asset's image on NFT Market and will allow users to leave Market and view the item on your site.|
| description  | String | A human readable description of the item. Markdown is supported.|
| attributes | [Attributes](#attributes-json-array)  | These are the attributes for the item, which will show up on the OpenSea page for the item. (see below).|
| background_color | String | Background color of the item on NFT Market. Must be a six-character hexadecimal without a pre-pended #.|
| animation_url | String | A URL to a multi-media attachment for the item. The file extensions GLTF, GLB, WEBM, MP4, M4V, OGV, and OGG are supported, along with the audio-only extensions MP3, WAV, and OGA.|
| youtube_url  | String | A URL to a YouTube video.|

#### Attributes: JSON Array

| Name      |  Type | Description |
|----------|:-------------:|------:|
| trait_type | String | If you don't want to have a trait_type for a particular trait, you can include just a value in the trait and it will be set as a generic property. |
| display_type  | Enum | number, date, boost_number, boost_percentage.|
| value | Any | Value of attribute.|

#### Example
```json
{"name":"silver","image":"https://e89d8b6f30bd225.kcdn.vn/chainverse/market/20220516T041745Z-310255777-box1.png","attributes":[{"trait_type":"type","value":0}]}
```
