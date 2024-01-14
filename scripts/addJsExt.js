import { authorsPen } from "./helpers/node/authorsPen.js";
// const readDir = require("./helpers/node/readDir");

const addJsExt = (filePath, pattern) => {
  const path = filePath.split("/");
  const fileName = path[path.length - 1];

  //   // log results
  //   const results = {};
  //   // read files and directories in path
  //   const directory = await readDir(currentPath);
  //   // if not directory was found log resulst
  //   if (!directory) results[currentPath] = "No such folder exists";
  //   else {
  //     // search for deserired files
  //     for (let file of directory) {
  //       // skip exludedDirectories
  //       if (exclude.includes(file)) return;
  //       const filePath = `${currentPath}/${file}`;
  //       // if its a ts file
  //       if (file.includes(".ts")) {
  //         await updateFile({ filePath, target, cb: (e) => renameExport(e, file) });
  //         // console.log(`Made changes to ${file}`);
  //       } else addJsExt(filePath, exclude);
  //     }
  //   }
  //   return results;
  // console.log("fileName :>> ", fileName);
  // return `Made file changes to ${fileName}`;
};
const main = async () => {
  const sourcePaths = ["src"];
  const excludedFiles = ["server", "config", "data", "@types"];
  const target = ".ts";
  let logger = {};
  // search each desired directory
  for (let num = 0; num < sourcePaths.length; num++) {
    const currentPath = sourcePaths[num];
    console.log("starting search on :>> ", currentPath);
    await authorsPen({ excludedFiles, currentPath, target, logger, cb: (e) => addJsExt(e) });
  }
  console.log("Changes made :>> ", logger);
};
main();
