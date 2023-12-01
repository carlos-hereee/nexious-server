const { awsBucketName } = require("../../../config.env");

const generateParamFile = (file) => {
  return { Bucket: awsBucketName, Key: Date.now() + "-" + file.originalname, Body: file.buffer };
};
const generateParamFiles = (files) => {
  return files.map((file) => generateParamFile(file));
};
module.exports = { generateParamFiles, generateParamFile };
