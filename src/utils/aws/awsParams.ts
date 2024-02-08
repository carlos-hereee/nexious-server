import type { AWSBucket, IFile } from "@app/assets";
import { awsBucketName } from "@appUtils/config";

const generateParamFile = (file: IFile): AWSBucket => {
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
