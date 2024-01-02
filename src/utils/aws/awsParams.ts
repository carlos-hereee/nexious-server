import { awsBucketName }  from "../../../config.env";

const generateParamFile = (file) => {
  if (!file) return null;
  return {
    Bucket: awsBucketName,
    Key: Date.now() + "-" + file?.originalname,
    Body: file?.buffer,
    ContentType: file?.mimetype,
  };
};
const generateParamFiles = (files) => {
  return files.map((file) => generateParamFile(file));
};
module.exports = { generateParamFiles, generateParamFile };
