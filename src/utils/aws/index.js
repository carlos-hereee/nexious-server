const { S3 } = require("@aws-sdk/client-s3");
const { awsRegion, awsAccessKey, awsSecretKey, awsBucketName } = require("../../../config.env");
const createBucket = require("./bucket/createBucket");
const listBuckets = require("./bucket/listBuckets");
const uploadFile = require("./file/uploadFile");
const listBucketItems = require("./bucket/listBucketItems");
const deleteBucket = require("./bucket/deleteBucket");
const listBucket = require("./bucket/listBucket");
const deleteFile = require("./file/deleteFile");
const uploadFiles = require("./file/uploadFiles");

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
