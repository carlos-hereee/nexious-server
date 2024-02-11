import type { AWSBucketParams } from "@app/assets";
import { bucketError } from "@utils/aws/errors";

// Call S3 to list the buckets
export const listBucket = ({ s3, listBucket, all }: AWSBucketParams) => {
  if (!listBucket) throw Error("listBucket is required");
  if (all) return s3.listBuckets(listBucket, bucketError);
  return s3.listBuckets(listBucket, bucketError);
};
