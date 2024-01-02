// Call S3 to delete the bucket
export = (s3, bucketName) =>
  s3.deleteBucket({ Bucket: bucketName }, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
