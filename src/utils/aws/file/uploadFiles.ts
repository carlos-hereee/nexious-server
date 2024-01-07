import uploadFile from "./uploadFile";

// call S3 to retrieve upload file to specified bucket
export const uploadFiles = async (s3, files) => {
  try {
    return await Promise.all(files.map((param) => uploadFile(s3, param)));
  } catch (error) {
    console.log("error :>> ", error);
  }
};
