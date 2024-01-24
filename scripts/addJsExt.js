import { authorsPen } from "./helpers/node/authorsPen.js";
import { addJsExt } from "./helpers/node/typography.js";
import { regexPatern } from "./helpers/regexPatterns.js";

const main = async () => {
  // key variables
  const sourcePaths = ["src"];
  const excludedFiles = ["server", "config", "data", "@types"];
  const target = ".ts";
  const pattern = regexPatern.localPathExcludeJson;
  let logger = {};
  // search each desired directory
  for (let num = 0; num < sourcePaths.length; num++) {
    const currentPath = sourcePaths[num];
    console.log("starting search on :>> ", currentPath);
    await authorsPen({ excludedFiles, currentPath, target, pattern, logger, cb: addJsExt });
  }
  // console.log("Changes made :>> ", logger);
};
main();
