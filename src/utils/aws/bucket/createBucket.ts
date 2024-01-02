// call S3 to create the bucket
export = (s3, bucketName) =>
  s3.createBucket({ Bucket: bucketName }, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Location);
    }
  });
