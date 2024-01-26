import type { AWSAssetParams, IFile } from "@app/assets.js";
import { awsBucketName } from "@appUtils/config.js";

const generateParamFile = (file: IFile): AWSAssetParams => {
  return {
    Bucket: awsBucketName,
    Key: Date.now() + "-" + file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
};
const generateParamFiles = (files: IFile[]) => {
  return files.map((file) => generateParamFile(file));
};
export { generateParamFiles, generateParamFile };
