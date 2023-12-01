const AWS = require("aws-sdk");
const { awsRegion, awsApiVersion, awsAccessKey, awsSecretKey } = require("../../../config.env");
const createBucket = require("./createBucket");
const listBuckets = require("./listBuckets");
const uploadFile = require("./uploadFile");
const listBucketItems = require("./listBucketItems");
const deleteBucket = require("./deleteBucket");

// AWS.config.update({ region: awsRegion });

// Create S3 service object
const s3 = new AWS.S3({
  region: awsRegion,
  accessKeyId: awsAccessKey,
  secretAccessKey: awsSecretKey,
});
// const s3 = new AWS.S3({ apiVersion: awsApiVersion,  });
// const s3 = new AWS.DynamoDB({ region: awsRegion });

module.exports = {
  allBuckets: () => listBuckets(s3),
  makeBucket: (bucketName) => createBucket(s3, bucketName),
  removeBucket: (bucketName) => deleteBucket(s3, bucketName),
  getBucketItems: (bucketName) => listBucketItems(s3, bucketName),
  addFile: ({ bucketName, filename, content }) => uploadFile(s3, { bucketName, filename, content }),
};
