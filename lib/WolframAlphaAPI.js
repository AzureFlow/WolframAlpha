import * as constants from "./constants.js";
import QueryBuilder from "./QueryBuilder.js";
import WolframAlphaError from "./WolframAlphaError.js";


export default class WolframAlphaAPI {
	/**
	 * @see https://products.wolframalpha.com/api/documentation/
	 * @param {string|QueryBuilder} input String or Object of parameters.
	 * @returns {Promise<(Object|string)>}
	 */
	async getFull(input) {
		let query;
		if(typeof input === "string") {
			query = new QueryBuilder()
				.addParam("input", input);
		}
		else {
			query = input;
		}

		query
			.addParam("appid", constants.APP_ID)
			.addParam("output", "json")
			.addParam("device", "Android");

		const resp = await fetch(`${constants.API_URL}?${query.build()}`, {
			method: "GET",
			headers: {
				"Accept": "*/*",
				"User-Agent": "Wolfram|Alpha Java Binding 1.1",
				"Accept-Language": "en-US,en;q=0.9",
			},
		});

		const content = (await resp.json())["queryresult"];
		if(content.success === false) {
			throw new WolframAlphaError(content["error"]["msg"], content["error"]["code"]);
		}

		return content;
	}
}