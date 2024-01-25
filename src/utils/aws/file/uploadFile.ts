import type { AWSFileProps } from "@app/assets.js";
import { fileError } from "./fileError.js";

// call S3 to retrieve upload file to specified bucket
export const uploadFile = ({ s3, params }: AWSFileProps) => {
  return s3.putObject(params, fileError);
};
