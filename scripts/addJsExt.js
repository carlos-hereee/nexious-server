const authorsPen = require("./helpers/node/authorsPen");
// const readDir = require("./helpers/node/readDir");

const addJsExt = async (filePath, pattern) => {
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
};
const main = async () => {
  const sourcePaths = ["src"];
  const excludeFiles = ["server", "config"];
  const target = ".ts";
  // const pattern = "";
  const logger = {};

  // search each desired directory
  for (let num = 0; num < sourcePaths.length; num++) {
    const currentPath = sourcePaths[num];
    console.log("starting search on :>> ", currentPath);
    const result = await authorsPen({ currentPath, excludeFiles, target, cb: (e) => addJsExt(e) });
    // add results to logger
    if (!logger[currentPath]) logger[currentPath] = { 0: result };
    else logger[currentPath][logger.current.length] = result;
  }
  console.log("Changes made :>> ", logger);
};
main();
