import type { AWSMultiFileUploadProps } from "@app/assets";
import { uploadFile } from "./uploadFile";

// call S3 to retrieve upload file to specified bucket
export const uploadFiles = async ({ s3, files }: AWSMultiFileUploadProps) => {
  try {
    return await Promise.all(files.map((params) => uploadFile({ s3, params })));
  } catch (error) {
    console.log("error :>> ", error);
  }
};
