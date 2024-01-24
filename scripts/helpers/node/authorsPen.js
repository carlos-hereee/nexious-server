import { readDir } from "./readDir.js";
import { updateFile } from "./updateFile.js";

// recursively traverse directory
export const authorsPen = async ({ currentPath, exclude, target, cb, logger, pattern }) => {
  // key variables
  if (!logger) logger = {};
  if (!exclude) exclude = { files: [], directory: [] };
  // read files and directories in path
  const directory = await readDir(currentPath);
  // if no directory was found log result
  if (!directory) logger[currentPath] = "No such folder exists";
  else {
    // search for deserired files
    for (let file of directory) {
      console.log("file :>> ", file);
      //   skip exludedFiles
      //   const filePath = `${currentPath}/${file}`;
      // const canSkipFile = exclude.files.some((f) => file.includes(f));
      // const canSkipDir = exclude.directory.some((d) => file.includes(d));
      // console.log("canSkipFile :>> ", canSkipFile);
      // console.log("canSkipDir :>> ", canSkipDir);
      // console.log("file.isDirectory() :>> ", file.isDirectory());
      //   if (canSkip) logger[filePath] = `skipped ${file}`;
      //   else {
      //     // if file is target file fire callback and log result
      //     if (file.includes(target)) {
      //       const result = await updateFile({ filePath, pattern, cb });
      //       logger[filePath] = result;
      //     }
      //     // otherwise rinse and repeat recursively
      //     else await authorsPen({ currentPath: filePath, excludedFiles, target, cb, logger });
      //   }
      // console.log("file :>> ", file, "can skippe", canSkip);
    }
  }
};
