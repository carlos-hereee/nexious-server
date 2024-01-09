import type { DeleteObjectCommandInput, PutObjectCommandInput, S3 } from "@aws-sdk/client-s3";

export interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export interface ReqFiles {
  files: IFile[];
  file: IFile;
}
export type AssetProps = (file: IFile, heroData?: { [key: string]: string }, key?: string) => void;

// AWS
export type S3Prop = S3;
export interface AWSAssetParams {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ContentType: string;
}
export interface AWSBucketProps {
  s3: S3;
  bucketName: string;
}
export interface AWSFileProps {
  s3: S3;
  params: PutObjectCommandInput | DeleteObjectCommandInput;
  // bucketName: string;
}
export interface AWSMultiFileUploadProps {
  s3: S3;
  files: AWSAssetParams[];
}
export type AWSFileError = (
  err: ErrorOptions,
  data: PutObjectCommandInput | DeleteObjectCommandInput
) => void;
