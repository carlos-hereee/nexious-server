// Call S3 to obtain a list of the objects in the bucket
module.exports = (s3, bucketName) =>
  s3.listObjects({ Bucket: bucketName }, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
