const readDir = require("./helpers/node/readDir");
const renameImport = require("./helpers/node/renameImport");
const updateFile = require("./helpers/node/updateFile");

const excludedDirectories = ["data"];

// recursively rename imports
const renameImports = async (sourcePath) => {
  const dir = await readDir(sourcePath);
  // console.log("\n\tSeaching folder :>> ", sourcePath);
  if (dir) {
    for (let file of dir) {
      // skip exludedDirectories
      if (excludedDirectories.includes(file)) return;
      const targetPath = `${sourcePath}/${file}`;
      // if its a ts file
      if (file.includes(".ts")) await updateFile(targetPath, renameImport);
      // if (file.includes("server.ts")) await updateFile(targetPath, renameImport);
      else if (file.includes(".ts")) return;
      else renameImports(targetPath);
    }
  } else console.log("\n:>> No such folder exists :>> ");
};

console.log("\n:>>> Starting script\n");
renameImports("./src");
