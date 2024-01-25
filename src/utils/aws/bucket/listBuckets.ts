import type { S3Prop } from "@app/assets.js";

export const listBuckets = (s3: S3Prop) => {
  //  list them all
  return s3.listBuckets((err: any, data: { Buckets: any }) => {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
};
