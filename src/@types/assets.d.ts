import type {
  CreateBucketCommandInput,
  DeleteBucketCommandInput,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  ListBucketsCommandInput,
  ListObjectsCommandInput,
  ListObjectsCommandOutput,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3,
} from "@aws-sdk/client-s3";
import type { Request, Express } from "express";
import { FileFilterCallback } from "multer";

// MULTER
export type IFile = Express.Multer.File;
export type MulterFileFilter = (req: Request, file: IFile, cb: FileFilterCallback) => void;
export interface MulterUploadField {
  name: string;
  maxCount: number;
}
export interface ReqFiles {
  files: IFile[];
  file: IFile;
}

// AWS
export interface AWSBucket {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ContentType: string;
}
export type AWSGetBucket = (bucket: AWSBucket, all?: boolean) => void;
export interface AWSBucketParams {
  s3: S3;
  all?: boolean;
  listBucket?: ListBucketsCommandInput;
  addBucket?: CreateBucketCommandInput;
  listBucketItems?: ListObjectsCommandInput;
  removeBucket?: DeleteBucketCommandInput;
}
export interface AWSFileProps {
  s3: S3;
  addFile?: PutObjectCommandInput;
  removeFile?: DeleteObjectCommandInput;
}
export type AssetProps = (file: IFile, heroData?: { [key: string]: string }, key?: string) => void;

export interface AWSMultiFileUploadProps {
  s3: S3;
  files: AWSBucket[];
}
export type AWSFileError = (err: string, data?: PutObjectCommandOutput | DeleteObjectCommandOutput) => void;
export type AWSBucketError = (err: string, data?: ListObjectsCommandOutput) => void;
export interface MulterUploadList {
  name: string;
  count: number;
}
