import type { AWSBucket, IFile } from "types/assets";
import { awsBucketName } from "@utils/app/config";

export const generateParamFile = (file: IFile): AWSBucket => {
  return {
    Bucket: awsBucketName,
    Key: Date.now() + "-" + file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
  };
};
export const generateParamFiles = (files: IFile[]) => {
  return files.map((file) => generateParamFile(file));
};
