import type { AWSFileProps } from "@app/assets";
import { fileError } from "./fileError";

// call S3 to retrieve upload file to specified bucket
export const deleteFile = ({ s3, params }: AWSFileProps) => {
  // const { bucketName, filename, content } = params ;
  return s3.deleteObject(params, fileError);
};
