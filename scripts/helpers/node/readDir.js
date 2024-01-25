import fs from "fs/promises";

export const readDir = async (directoryPath) => {
  try {
    return await fs.readdir(directoryPath, { withFileTypes: true });
  } catch (error) {
    throw Error("unable to read directory", error);
  }
};
