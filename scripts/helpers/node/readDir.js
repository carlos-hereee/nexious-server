const fs = require("fs/promises");

module.exports = async (directoryPath) => {
  try {
    return await fs.readdir(directoryPath);
  } catch (error) {
    console.log("error :>> ", error);
    return null;
  }
};
