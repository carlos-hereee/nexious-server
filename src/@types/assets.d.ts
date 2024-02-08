import type {
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3,
} from "@aws-sdk/client-s3";
import type { Request, Express } from "express";
import { FileFilterCallback } from "multer";

export type DestinationCallback = (error: Error | null, destination: string) => void;
export type FileNameCallback = (error: Error | null, filename: string) => void;
export type IFile = Express.Multer.File;

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
}
export type MulterFileFilter = (req: Request, file: IFile, cb: FileFilterCallback) => void;
export interface AWSMultiFileUploadProps {
  s3: S3;
  files: AWSAssetParams[];
}
export type AWSFileError = (err: Error, data?: PutObjectCommandOutput | DeleteObjectCommandOutput) => void;
export interface MulterUploadList {
  name: string;
  count: number;
}
export interface MulterUploadField {
  name: string;
  maxCount: number;
}
