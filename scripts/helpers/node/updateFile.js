import fs from "fs/promises";
import { matchString } from "./matchString.js";
import { errorMessage, requiredProps, updateFileMessages } from "../data.js";

export const updateFile = async ({ filePath, pattern, cb }) => {
  try {
    // require key variables
    if (!pattern) throw Error(requiredProps.regexPattern);
    // keep track of modified files
    let isModified = false;
    // read file
    const file = await fs.readFile(filePath, "utf8");
    // convert to array
    const lineByLine = file.split(/\r?\n/);
    // iterate and match with desired partern
    const updatedFile = lineByLine.map((line) => {
      // if match fire cb else  line remains unchanged
      return matchString(line, pattern) ? cb(line) && (isModified = true) : line;
    });
    // if the file meets conditions
    if (isModified) {
      // update file
      // await fs.writeFile(filePath, updatedFile.join("\n"));
      // return success status
      return updateFileMessages.success;
    }
    console.log("isModified :>> ", isModified);
    // otherwise skip update and return status
    return updateFileMessages.skipped;
    // update file
  } catch (error) {
    return errorMessage(error, "unable to update file");
  }
};
