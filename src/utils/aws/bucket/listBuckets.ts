import type { AWSBucketParams } from "@app/assets";

export const listBuckets = async ({ s3, listBucket }: AWSBucketParams) => {
  //  list them all
  if (!listBucket) throw Error("listBucket is required");
  return s3.listBuckets(listBucket);
};
