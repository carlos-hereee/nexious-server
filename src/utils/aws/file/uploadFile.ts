import type { AWSFileProps, AWSMultiFileUploadProps } from "@app/assets";
import { fileError } from "@utils/aws/errors";

// call S3 to retrieve upload file to specified bucket
export const uploadFile = ({ s3, addFile }: AWSFileProps) => {
  if (!addFile) throw Error("addFile is required");
  return s3.putObject(addFile, fileError);
};

// call S3 to retrieve upload file to specified bucket
export const uploadFiles = ({ s3, files }: AWSMultiFileUploadProps) => {
  return files.map((params) => uploadFile({ s3, addFile: params }));
};
