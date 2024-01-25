import type { AWSBucketProps } from "@app/assets.js";

// Call S3 to delete the bucket
export const deleteBucket = ({ s3, bucketName }: AWSBucketProps) => {
  return s3.deleteBucket({ Bucket: bucketName }, (err, data) => {
    if (err || !data) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};
