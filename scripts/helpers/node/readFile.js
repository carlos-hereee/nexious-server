const fs = require("fs/promises");

module.exports = async (filePath, cb) => {
  try {
    const file = await fs.readFile(filePath, "utf8");
    const lineByLine = file.split(/\r?\n/);
    return cb ? cb(lineByLine) : lineByLine;
  } catch (error) {
    console.log("error :>> ", error);
    return null;
  }
};
