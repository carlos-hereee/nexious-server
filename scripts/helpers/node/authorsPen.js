import { readDir } from "./readDir.js";
import { updateFile } from "./updateFile.js";

// recursively traverse directory
export const authorsPen = async ({ currentPath, excludedFiles, target, cb, logger, pattern }) => {
  // read files and directories in path
  const directory = await readDir(currentPath);
  if (!logger) logger = {};

  // if no directory was found log result
  if (!directory) logger[currentPath] = "No such folder exists";
  else {
    // search for deserired files
    for (let file of directory) {
      // skip exludedFiles
      const filePath = `${currentPath}/${file}`;
      const canSkip = excludedFiles.some((f) => file.includes(f));

      if (canSkip) logger[filePath] = `skipped ${file}`;
      else {
        // if file is target file fire callback and log result
        if (file.includes(target)) {
          await updateFile({ filePath, pattern, cb });
          logger[filePath] = `Made file changes to ${file}`;
        }
        // otherwise rinse and repeat recursively
        else await authorsPen({ currentPath: filePath, excludedFiles, target, cb, logger });
      }
    }
  }
};
