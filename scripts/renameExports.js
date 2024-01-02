const readDir = require("./helpers/node/readDir");
const renameExport = require("./helpers/node/renameExport");
const updateFile = require("./helpers/node/updateFile");

const excludedDirectories = ["data"];
const target = "export = (res, error, message)";

// recursively rename imports
const renameExports = async (sourcePath) => {
  const dir = await readDir(sourcePath);
  // console.log("\n\tSeaching folder :>> ", sourcePath);
  if (dir) {
    for (let file of dir) {
      // skip exludedDirectories
      if (excludedDirectories.includes(file)) return;
      const filePath = `${sourcePath}/${file}`;
      // if its a ts file
      if (file.includes("useGenericErrors.ts")) {
        await updateFile({ filePath, target, cb: (e) => renameExport(e, file) });
      } else if (!file.includes(".ts")) renameExports(filePath);
    }
  } else console.log("\n:>> No such folder exists :>> ");
};

console.log("\n:>>> Starting script\n");
renameExports("./src");
