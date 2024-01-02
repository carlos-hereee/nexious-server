const readDir = require("./helpers/node/readDir");
const readFile = require("./helpers/node/readFile");

// # KEY VARIABLES
const targetString = new RegExp(`= require("*")`);
const excludedDirectories = ["data"];

const renameImport = async (filePath) => {
  const file = await readFile(filePath);
  //  let re = new RegExp("^.*" + searchString + ".*$", "gm");
  if (file) {
    // console.log("file:>> ", file);
    file.forEach((line) => {
      if (line.match(targetString)) console.log("line :>> ", line);
    });
  }
  return;
};
// recursively rename imports
const renameImports = async (sourcePath) => {
  const dir = await readDir(sourcePath);
  console.log("\n\tSeaching folder :>> ", sourcePath);
  if (dir) {
    for (let file of dir) {
      // skip exludedDirectories
      if (excludedDirectories.includes(file)) return;
      const targetPath = `${sourcePath}/${file}`;
      if (file.includes(".ts")) renameImport(targetPath);
      else renameImports(targetPath);
    }
  }
};
console.log("\nStarting script");
renameImports("./src");
