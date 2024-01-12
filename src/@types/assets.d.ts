import type {
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3,
} from "@aws-sdk/client-s3";
import type { Request } from "express";

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
export type MulterFileFilter = (
  req: Request,
  file: IFile,
  cb: (key: Error | null, pass?: boolean) => void
) => void;
export interface AWSMultiFileUploadProps {
  s3: S3;
  files: AWSAssetParams[];
}
export type AWSFileError = (
  err: ErrorOptions,
  data?: PutObjectCommandOutput | DeleteObjectCommandOutput
) => void;
