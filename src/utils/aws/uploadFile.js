// call S3 to retrieve upload file to specified bucket
const uploadParams = { Bucket: process.argv[2], Key: "", Body: "" };
const file = process.argv[3];

// Configure the file stream and obtain the upload parameters
const fs = require("fs");
const fileStream = fs.createReadStream(file);
fileStream.on("error", function (err) {
  console.log("File Error", err);
});
uploadParams.Body = fileStream;
const path = require("path");
uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
module.exports = (s3, bucketName) =>
  s3.upload(uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
    }
    if (data) {
      console.log("Upload Success", data.Location);
    }
  });
