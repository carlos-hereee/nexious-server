export const message = {
  error: "Unable to perform operation",
  skipped: "Skipped due to",
  modified: "Made changes to",
  regexRequired: "A regex expression is required please include it in function param",
  filePath: "filePath is a required prop please include it in function param",
  cb: "cb(callback) is a required prop please include it in function param",
};

export const updateFileMessages = {
  success: { message: message.modified, status: "success", error: null },
  skipped: { message: message.skipped, status: "skipped", error: null },
};

export const errorMessage = (error, msg) => {
  return { status: "error", error, message: msg };
};

export const requiredProps = {
  regexPattern: { message: message.regexRequired, status: "missingProps", error: "missing" },
  filePath: { message: message.filePath, status: "missingProps", error: "missing" },
  cb: { message: message.cb, status: "missingProps", error: "missing" },
};
