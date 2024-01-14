const readDir = require("./readDir");

// recursively traverse directory
module.exports = authorsPen = async (props) => {
  const { currentPath, excludedFiles, target, cb } = props;
  // log results
  const logger = {};
  // read files and directories in path
  const directory = await readDir(currentPath);
  // if not directory was found log resulst
  if (!directory) logger[currentPath] = "No such folder exists";
  else {
    // search for deserired files
    for (let file of directory) {
      // skip exludedFiles
      if (excludedFiles.includes(file)) logger[currentPath] = `File skipped ${file}`;
      else {
        const filePath = `${currentPath}/${file}`;
        // if target file fire callback and log result
        if (file.includes(target)) logger[filePath] = cb(filePath);
        // otherwise rinse and repeat recursively
        else authorsPen(filePath, excludedFiles);
      }
    }
  }
  return logger;
};
