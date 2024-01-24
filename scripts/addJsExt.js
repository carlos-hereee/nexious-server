import { authorsPen } from "./helpers/node/authorsPen.js";
import { addJsExt } from "./helpers/node/typography.js";
import { regexPatern } from "./helpers/regexPatterns.js";

const excludedFiles = { files: ["server", "config"], directory: ["data", "@types"] };
const reg = regexPatern.localPathExcludeJson;
const search = ["src"];
const ext = ".ts";

const main = async ({ searchPaths, exclude, pattern, target }) => {
  // key variables
  let logger = {};
  // search each desired directory
  for (let num = 0; num < searchPaths.length; num += 1) {
    const currentPath = searchPaths[num];
    console.log("starting search on :>> ", currentPath);
    await authorsPen({ exclude, currentPath, target, pattern, logger, cb: addJsExt });
  }
  // console.log("Changes made :>> ", logger);
};
main({ searchPaths: search, exclude: excludedFiles, pattern: reg, target: ext });
