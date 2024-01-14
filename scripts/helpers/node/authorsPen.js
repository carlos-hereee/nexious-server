import { readDir } from "./readDir.js";

// recursively traverse directory
export const authorsPen = async ({ currentPath, excludedFiles, target, cb, logger }) => {
  // read files and directories in path
  const directory = await readDir(currentPath);
  // if not directory was found log resulst
  if (!logger) logger = {};

  if (!directory) logger[currentPath] = "No such folder exists";
  else {
    // search for deserired files
    for (let file of directory) {
      // skip exludedFiles
      const filePath = `${currentPath}/${file}`;
      const canSkip = excludedFiles.some((f) => file.includes(f));

      if (canSkip) logger[filePath] = `skipped ${file}`;
      else {
        // if target file fire callback and log result
        if (file.includes(target)) {
          logger[filePath] = `Made file changes to ${file}`;
          cb(filePath);
        }
        // otherwise rinse and repeat recursively
        else await authorsPen({ currentPath: filePath, excludedFiles, target, cb, logger });
      }
    }
  }
};
