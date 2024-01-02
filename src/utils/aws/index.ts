import { S3 }  from "@aws-sdk/client-s3";
import { awsRegion, awsAccessKey, awsSecretKey }  from "../../../config.env";
import createBucket  from "./bucket/createBucket";
import listBuckets  from "./bucket/listBuckets";
import uploadFile  from "./file/uploadFile";
import listBucketItems  from "./bucket/listBucketItems";
import deleteBucket  from "./bucket/deleteBucket";
import listBucket  from "./bucket/listBucket";
import deleteFile  from "./file/deleteFile";
import uploadFiles  from "./file/uploadFiles";

// Create S3 service object
const s3 = new S3({
  region: awsRegion,
  credentials: { accessKeyId: awsAccessKey, secretAccessKey: awsSecretKey },
});

module.exports = {
  allBuckets: () => listBuckets(s3),
  getBucket: (bucketName) => listBucket(bucketName),
  makeBucket: (bucketName) => createBucket(s3, bucketName),
  removeBucket: (bucketName) => deleteBucket(s3, bucketName),
  getBucketItems: (bucketName) => listBucketItems(s3, bucketName),
  addFile: (params) => uploadFile(s3, params),
  addMulipleFiles: (params) => uploadFiles(s3, params),
  removeFile: (params) => deleteFile(s3, params),
};
