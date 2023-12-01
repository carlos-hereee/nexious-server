// call S3 to retrieve upload file to specified bucket
module.exports = (s3, { bucketName, filename, content }) =>
  s3.deleteObject({ Bucket: bucketName, Key: filename, Body: content }, (err, data) => {
    if (err) {
      console.log("Error", err);
    }
    return data;
    // if (data) {
    //   console.log("Upload Success", data.Location);
    // }
  });
