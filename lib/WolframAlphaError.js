export default class WolframAlphaError extends Error {
	name = "WolframAlphaError";

	/**
	 * @param {string} message
	 * @param {number} code
	 */
	constructor(message, code) {
		super();
		this.message = `${message} (err#: ${code})`;
	}
}