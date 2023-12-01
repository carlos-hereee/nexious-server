const { awsBucketName } = require("../../../config.env");

const generateParamFiles = (files) => {
  return files.map((file) => {
    return {
      Bucket: awsBucketName,
      Key: file.orginalname,
      Body: file.buffer,
    };
  });
};
const generateParamFile = (file) => {
  return { Bucket: awsBucketName, Key: file.filename, Body: file.buffer };
};
module.exports = { generateParamFiles, generateParamFile };
