import { AWSBucketError, AWSFileError } from "types/assets";

// errors
export const bucketError: AWSBucketError = (err, data) => {
  if (err || !data) throw Error("error occured with bucket: ==>" + err);
  return data;
};
export const fileError: AWSFileError = (err, data) => {
  if (err || !data) throw Error("error occured with file: ==>" + err);
  return data;
};
