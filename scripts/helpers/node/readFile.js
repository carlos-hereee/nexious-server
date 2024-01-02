const fs = require("fs/promises");

module.exports = async (filePath) => {
  try {
    const file = await fs.readFile(filePath, "utf8");
    return file.split(/\r?\n/);
  } catch (error) {
    console.log("error :>> ", error);
    return null;
  }
};
