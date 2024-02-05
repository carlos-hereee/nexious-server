import type { AWSFileError } from "@app/assets";

export const fileError: AWSFileError = (err, data) => {
  if (err || !data) {
    throw Error(`error occured with file: ==> ${err}`);
  }
  return data;
};
