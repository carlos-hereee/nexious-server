import type { AWSFileProps } from "@app/assets";
import { fileError } from "@utils/aws/errors";

// call S3 to retrieve upload file to specified bucket
export const deleteFile = ({ s3, removeFile }: AWSFileProps) => {
  if (!removeFile) throw Error("removeFile is required");
  return s3.deleteObject(removeFile, fileError);
};
