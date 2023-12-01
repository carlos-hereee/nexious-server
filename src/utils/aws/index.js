const AWS = require("aws-sdk");

// AWS.config.update({ region: "" });

// Create S3 service object
s3 = new AWS.S3();

(async () => {
  await s3
    .putObject({
      // content
      Body: "",
      // bucket name
      Bucket: "nexious",
      // name of file
      Key: "",
    })
    .promise();
})();

// Call S3 to list the buckets
s3.listBuckets((err, data) => {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});
