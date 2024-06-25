import { S3 } from "@aws-sdk/client-s3";
import { awsRegion, awsAccessKey, awsSecretKey } from "@utils/app/config";
import { createBucket } from "./bucket/createBucket";
import { listBucket } from "./bucket/listBucket";
import { listBucketItems } from "./bucket/listBucketItems";
import { uploadFile, uploadFiles } from "./file/uploadFile";
import { deleteBucket } from "./bucket/deleteBucket";
import { deleteFile } from "./file/deleteFile";
import type { AWSBucket, AWSGetBucket, IFile } from "types/assets";

// Create S3 service object
const s3 = new S3({
  region: awsRegion,
  credentials: { accessKeyId: awsAccessKey, secretAccessKey: awsSecretKey },
});

// get buckets
export const getBucket: AWSGetBucket = (bucket, all) => listBucket({ s3, listBucket: bucket, all });
// build a bucket
export const makeBucket = (bucket: AWSBucket) => createBucket({ s3, addBucket: bucket });
// remove a bucket
export const removeBucket = (bucket: AWSBucket) => deleteBucket({ s3, removeBucket: bucket });
// show bucket items
export const getBucketItems = (bucket: AWSBucket) => listBucketItems({ s3, listBucketItems: bucket });
// add file
export const saveFile = (file: IFile) => uploadFile({ s3, file });
// remove file
export const removeFile = (bucket: AWSBucket) => deleteFile({ s3, removeFile: bucket });
// add multiple files
export const addMulipleFiles = (files: AWSBucket[]) => uploadFiles({ s3, files });
