import { S3 } from "@aws-sdk/client-s3";
import { awsRegion, awsAccessKey, awsSecretKey } from "@config";
import { createBucket } from "./bucket/createBucket";
import { listBuckets } from "./bucket/listBuckets";
import { listBucket } from "./bucket/listBucket";
import { listBucketItems } from "./bucket/listBucketItems";
import { uploadFile } from "./file/uploadFile";
import { deleteBucket } from "./bucket/deleteBucket";
import { deleteFile } from "./file/deleteFile";
import { uploadFiles } from "./file/uploadFiles";
import type { AWSAssetParams } from "@app/assets";

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
