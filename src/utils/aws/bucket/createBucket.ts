import type { AWSBucketProps } from "@app/assets.js";

// call S3 to create the bucket
export const createBucket = ({ s3, bucketName }: AWSBucketProps) =>
  s3.createBucket({ Bucket: bucketName }, (err, data) => {
    if (err || !data) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Location);
    }
  });
