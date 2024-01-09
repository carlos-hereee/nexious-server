import type { AWSFileProps } from "@app/assets";
import { fileError } from "./fileError";

// call S3 to retrieve upload file to specified bucket
export const uploadFile = ({ s3, params }: AWSFileProps) => s3.putObject(params, fileError);
