import fs from "fs/promises";

export const readDir = async (directoryPath) => {
  try {
    return await fs.readdir(directoryPath);
  } catch (error) {
    console.log("error :>> ", error);
    return null;
  }
};
