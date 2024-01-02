const fs = require("fs/promises");
const matchString = require("./matchString");

module.exports = async (filePath, cb) => {
  try {
    const file = await fs.readFile(filePath, "utf8");
    const lineByLine = file.split(/\r?\n/);
    const updatedFile = lineByLine.map((line) => {
      return matchString(line, "= require(.*)") ? cb(line) : line;
    });
    // console.log("compileFile :>> ", updatedFile.join("\n"));
    await fs.writeFile(filePath, updatedFile.join("\n"));
    // console.log("lineByLine :>> ", updatedFile);
  } catch (error) {
    console.log("error :>> ", error);
    return null;
  }
};
