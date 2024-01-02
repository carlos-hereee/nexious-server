// Call S3 to list the buckets
export  (s3) =>
  s3.listBuckets((err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
