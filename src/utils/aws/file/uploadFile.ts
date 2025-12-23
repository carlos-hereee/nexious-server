import type { AWSFileProps, AWSMultiFileUploadProps } from "@app/assets";
import { awsImageUrl } from "@utils/app/config";
import { fileError } from "@utils/aws/errors";
import { generateParamFile } from "./awsParams";

// call S3 to retrieve upload file to specified bucket
export const uploadFile = ({ s3, file }: AWSFileProps) => {
  // require key variables
  if (!file) throw Error("file is required");
  // create params for aws bucket
  const params = generateParamFile(file);
  // add file to bucket
  s3.putObject(params, fileError);
  // return image url
  return awsImageUrl + params.Key;
};

// call S3 to retrieve upload file to specified bucket
export const uploadFiles = ({ s3, files }: AWSMultiFileUploadProps) => {
  return files.map((params) => uploadFile({ s3, addFile: params }));
};
