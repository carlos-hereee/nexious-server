import type { AWSBucketParams } from "@app/assets";
import { bucketError } from "@utils/aws/errors";

// call S3 to create the bucket
export const createBucket = ({ s3, addBucket }: AWSBucketParams) => {
  if (!addBucket) throw Error("addBucket is required");
  return s3.createBucket(addBucket, bucketError);
};
