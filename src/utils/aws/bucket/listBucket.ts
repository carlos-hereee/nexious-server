import type { AWSBucketProps } from "@app/assets.js";

// Call S3 to list the buckets
export const listBucket = ({ s3, bucketName }: AWSBucketProps) => {
  return s3.listBuckets({ Bucket: bucketName }, (err, data) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
};
