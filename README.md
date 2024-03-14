# Wolfram|Alpha API

This project is a simple wrapper around Wolfram|Alpha's API using a reverse engineered mobile signature.

See Wolfram|Alpha's API [docs](https://products.wolframalpha.com/api/documentation/) for more information.

## Install

```sh
npm install @azureflow/wolfram_alpha_api
```

## Example

```js
import {WolframAlphaAPI, QueryBuilder} from "@azureflow/wolfram_alpha_api";

const waApi = new WolframAlphaAPI();
const query = new QueryBuilder()
	.addParam("input", "x^2 + 5x + 6 = 0")
	.addParam("format", "plaintext");

const result = await waApi.getFull(query);
console.log(result);
```

See [`examples/example.js`](examples/example.js) for a full demo.

## Disclaimer

This project is in no way associated with Wolfram|Alpha or Wolfram Alpha LLC.

This project is also provided without any warranties. Please see [LICENSE](LICENSE) for more information.