import { S3 } from "@aws-sdk/client-s3";
import { awsRegion, awsAccessKey, awsSecretKey } from "@config";
import { createBucket } from "./bucket/createBucket.js";
import { listBuckets } from "./bucket/listBuckets.js";
import { listBucket } from "./bucket/listBucket.js";
import { listBucketItems } from "./bucket/listBucketItems.js";
import { uploadFile } from "./file/uploadFile.js";
import { deleteBucket } from "./bucket/deleteBucket.js";
import { deleteFile } from "./file/deleteFile.js";
import { uploadFiles } from "./file/uploadFiles.js";
import type { AWSAssetParams } from "@app/assets.js";

// Create S3 service object
const s3 = new S3({
  region: awsRegion,
  credentials: { accessKeyId: awsAccessKey, secretAccessKey: awsSecretKey },
});

// show buckets
export const allBuckets = () => listBuckets(s3);
export const getBucket = (bucketName: string) => listBucket({ s3, bucketName });
// build a bucket
export const makeBucket = (bucketName: string) => createBucket({ s3, bucketName });
// remove a bucket
export const removeBucket = (bucketName: string) => deleteBucket({ s3, bucketName });
// show bucket items
export const getBucketItems = (bucketName: string) => listBucketItems({ s3, bucketName });
// add file
export const addFile = (params: AWSAssetParams) => uploadFile({ s3, params });
// remove file
export const removeFile = (params: AWSAssetParams) => deleteFile({ s3, params });
// add multiple files
export const addMulipleFiles = (files: AWSAssetParams[]) => uploadFiles({ s3, files });
