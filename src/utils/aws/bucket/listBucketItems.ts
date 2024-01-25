import type { AWSBucketProps } from "@app/assets.js";

// Call S3 to obtain a list of the objects in the bucket
export const listBucketItems = ({ s3, bucketName }: AWSBucketProps) => {
  // if bucket name list bucket
  // Call S3 to obtain a list of the objects in the bucket
  return s3.listObjects({ Bucket: bucketName }, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};
