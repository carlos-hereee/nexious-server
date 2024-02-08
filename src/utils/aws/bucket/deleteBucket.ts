import type { AWSBucketParams } from "@app/assets";
import { bucketError } from "@aws/errors";

// Call S3 to delete the bucket
export const deleteBucket = ({ s3, removeBucket }: AWSBucketParams) => {
  if (!removeBucket) throw Error("removeBucket is required");
  return s3.deleteBucket(removeBucket, bucketError);
};
