// Call S3 to delete the bucket
module.exports = (s3, bucketName) =>
  s3.deleteBucket({ Bucket: bucketName }, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
