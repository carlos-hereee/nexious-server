import { requiredProps } from "./helpers/data.js";
import { authorsPen } from "./helpers/node/authorsPen.js";
import { jsonAssert } from "./helpers/node/typography.js";
import { regexPatern } from "./helpers/regexPatterns.js";

const excludedFiles = { files: [], directory: [] };
const reg = regexPatern.localPathIncludeJson;
const search = ["src"];
const ext = ".ts";

const main = async ({ searchPaths, exclude, pattern, target }) => {
  // key variables
  if (!searchPaths) throw Error(requiredProps.searchPaths);
  if (!target) throw Error(requiredProps.target);
  if (!pattern) throw Error(requiredProps.pattern);
  if (!exclude) exclude = { files: [], directory: [] };
  let logger = {};
  // search each desired directory
  for (let num = 0; num < searchPaths.length; num += 1) {
    const currentPath = searchPaths[num];
    console.log("starting search on :>> ", currentPath);
    await authorsPen({ exclude, currentPath, target, pattern, logger, cb: jsonAssert });
  }
  // TODO: cleaner log i.e. updated x num of files skipped x num of files ect.
  // console.log("Changes made :>> ", logger);
};
main({ searchPaths: search, exclude: excludedFiles, pattern: reg, target: ext });
