import {WolframAlphaAPI, QueryBuilder} from "@azureflow/wolfram_alpha_api";
import {inspect} from "node:util";


const DEBUG = false;
const waApi = new WolframAlphaAPI();

const formats = ["plaintext"];
const query = new QueryBuilder()
	.addParam("input", "x^2 + 5x + 6 = 0")
	// .addParam("banners", "image")
	// .addParam("async", 0.25)
	// .addParam("scantimeout", 0.5)
	// .addParam("sidebarlinks", true)
	// .addParam("podtimeout", true)
	// .addParam("width", 1328)
	// .addParam("maxwidth", 2760)
	// .addParam("mag", 3.5)
	// .addParam("countrycode", "US")
	// .addParam("languagecode", "en")
	.addParam("format", formats.join(","))
	.addParam("podstate", "Solution__Step-by-step solution")
	.addParam("podstate", "Solution__Use factor method")
	.addParam("includepodid", "Solution");

const result = await waApi.getFull(query);
if(DEBUG) {
	console.log("result:", inspect(result, false, null, true));
}

if(result["numpods"] > 0) {
	const subpods = result["pods"][0]["subpods"];
	console.log("Response:\n" + subpods[subpods.length - 1]["plaintext"]);
}