import type { AWSBucketError } from "@app/assets";

export const bucketError: AWSBucketError = (err, data) => {
  if (err || !data) throw Error("error occured with bucket: ==>" + err);
  return data;
};
