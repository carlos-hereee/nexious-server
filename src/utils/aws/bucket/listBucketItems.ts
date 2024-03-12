import type { AWSBucketParams } from "@app/assets";
import { bucketError } from "@utils/aws/errors";

// Call S3 to obtain a list of the objects in the bucket
export const listBucketItems = ({ s3, listBucketItems }: AWSBucketParams) => {
  if (!listBucketItems) throw Error("listBucketItems is required");
  // if bucket name list bucket
  // Call S3 to obtain a list of the objects in the bucket
  return s3.listObjects(listBucketItems, bucketError);
};
