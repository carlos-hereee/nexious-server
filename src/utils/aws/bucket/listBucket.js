// Call S3 to list the buckets
module.exports = (s3, bucketName) =>
  s3.listBucket({ Bucket: bucketName }, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
