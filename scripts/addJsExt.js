import { authorsPen } from "./helpers/node/authorsPen.js";

const addJsExt = (string) => {
  console.log("string,  :>> ", string);
};
const main = async () => {
  const sourcePaths = ["src/middleware/app"];
  const excludedFiles = ["server", "config", "data", "@types"];
  const target = ".ts";
  const pattern = `from ".*/*"`;
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
