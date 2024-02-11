import {md5} from "./utils.js";
import {APP_SALT} from "./constants.js";


export default class QueryBuilder {
	/**
	 * It unfortunately has to be done this way since you can have duplicate keys,
	 * and it doesn't use the standard bracket method.
	 * @type {{key: string, value: string}[]}
	 */
	#parts = [];


	/**
	 * @param {string} key
	 * @param {any} value
	 * @returns {QueryBuilder}
	 */
	addParam(key, value) {
		this.#parts.push({
			key: key,
			value: value.toString(),
		});

		return this;
	}

	/**
	 * @param {string} key
	 * @returns {string|undefined}
	 */
	getParam(key) {
		return this.#parts.find(x => x.key === key)?.value;
	}

	/**
	 * @return {string}
	 */
	build() {
		const sorted = this.#parts.sort((a, b) => {
			return (a.key > b.key) - (a.key < b.key);
		});

		const queryString = sorted
			.map(x => `${encodeURIComponent(x.key)}=${encodeURIComponent(x.value)}`)
			.join("&");

		const querySignature = md5(APP_SALT + sorted
			.map(x => `${encodeURIComponent(x.key)}${encodeURIComponent(x.value)}`)
			.join(""),
		);

		return `${queryString}&sig=${querySignature}`;
	}
}