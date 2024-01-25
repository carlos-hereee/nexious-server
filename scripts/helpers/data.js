export const message = {
  error: "Unable to perform operation",
  skipped: "Skipped excluded file",
  notFound: "Skipped unable to find directory",
  skippedDir: "Skipped excluded directory",
  modified: "Made changes to file",
  regexRequired: "A regex expression is required please include it in function param",
  filePath: "filePath is a required prop please include it in function param",
  searchPaths: "search paths is a required prop please include it in function param",
  target: "search paths is a required prop please include it in function param",
  cb: "cb(callback) is a required prop please include it in function param",
};

export const updateFileMessages = {
  success: { message: message.modified, status: "success", error: null },
  skipped: { message: message.skipped, status: "skipped", error: null },
  notFound: { message: message.notFound, status: "skipped", error: null },
  skippedDir: { message: message.skippedDir, status: "skipped", error: null },
};

export const errorMessage = (error, msg) => {
  return { status: "error", error, message: msg };
};

export const requiredProps = {
  pattern: { message: message.regexRequired, status: "missingProps", error: "missing" },
  filePath: { message: message.filePath, status: "missingProps", error: "missing" },
  cb: { message: message.cb, status: "missingProps", error: "missing" },
  searchPaths: { message: message.searchPaths, status: "missingProps", error: "missing" },
  target: { message: message.target, status: "missingProps", error: "missing" },
};
