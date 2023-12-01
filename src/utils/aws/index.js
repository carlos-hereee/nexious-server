const { S3 } = require("@aws-sdk/client-s3");
const { awsRegion, awsAccessKey, awsSecretKey } = require("../../../config.env");
const createBucket = require("./bucket/createBucket");
const listBuckets = require("./bucket/listBuckets");
const uploadFile = require("./file/uploadFile");
const listBucketItems = require("./bucket/listBucketItems");
const deleteBucket = require("./bucket/deleteBucket");

// Create S3 service object
const s3 = new S3({
  region: awsRegion,
  credentials: { accessKeyId: awsAccessKey, secretAccessKey: awsSecretKey },
});

module.exports = {
  allBuckets: () => listBuckets(s3),
  makeBucket: (bucketName) => createBucket(s3, bucketName),
  removeBucket: (bucketName) => deleteBucket(s3, bucketName),
  getBucketItems: (bucketName) => listBucketItems(s3, bucketName),
  addFile: ({ bucketName, filename, content }) => uploadFile(s3, { bucketName, filename, content }),
};
