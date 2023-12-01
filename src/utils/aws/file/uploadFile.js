// call S3 to retrieve upload file to specified bucket
module.exports = (s3, params) =>
  s3.putObject(params, (err, data) => {
    if (err) {
      throw Error("unable to upload file", err);
      // console.log("Error", err);
    }
    return data;
    // if (data) {
    //   console.log("data :>> ", data);
    //   console.log("Upload Success", data.Location);
    // }
  });
