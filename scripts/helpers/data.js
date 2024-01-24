export const message = {
  error: "Unable to perform operation",
  skipped: "Skipped due to",
  modified: "Made changes to",
  regexRequired: "A regex expression is required",
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
};
