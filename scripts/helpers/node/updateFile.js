const fs = require("fs/promises");
const matchString = require("./matchString");

module.exports = async ({ filePath, target, cb }) => {
  try {
    // read file
    const file = await fs.readFile(filePath, "utf8");
    // convert to array
    const lineByLine = file.split(/\r?\n/);
    // iterate and match with desired partern
    const updatedFile = lineByLine.map((line) => {
      // if match fire cb else  line remains unchanged
      return matchString(line, target) ? cb(line) : line;
    });
    // console.log("updatedFile :>> ", updatedFile);
    // update file
    await fs.writeFile(filePath, updatedFile.join("\n"));
  } catch (error) {
    console.log("error :>> ", error);
    return null;
  }
};
