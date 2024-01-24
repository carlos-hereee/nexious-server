import fs from "fs/promises";
import { errorMessage } from "../data.js";

export const readDir = async (directoryPath) => {
  try {
    return await fs.readdir(directoryPath, { withFileTypes: true });
  } catch (error) {
    return errorMessage(error, "unable to read directory");
  }
};
