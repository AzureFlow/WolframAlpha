import {createHash} from "crypto";


/**
 * @param {import("crypto").BinaryLike} data
 */
export function md5(data) {
	return createHash("md5")
		.update(data)
		.digest("hex")
		.toUpperCase();
}