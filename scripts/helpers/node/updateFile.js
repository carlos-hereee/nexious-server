import fs from "fs/promises";
import { matchString } from "./matchString.js";

export const updateFile = async ({ filePath, pattern, cb }) => {
  try {
    // read file
    const file = await fs.readFile(filePath, "utf8");
    // convert to array
    const lineByLine = file.split(/\r?\n/);
    // iterate and match with desired partern
    const updatedFile = lineByLine.map((line) => {
      // if match fire cb else  line remains unchanged
      return matchString(line, pattern) ? cb(line) : line;
    });
    // console.log("updatedFile :>> ", updatedFile);
    // update file

    // await fs.writeFile(filePath, updatedFile.join("\n"));
  } catch (error) {
    console.log("error :>> ", error);
    return null;
  }
};
