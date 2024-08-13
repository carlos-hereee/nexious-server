import type { MulterFileFilter, MulterUploadField, MulterUploadList } from "@app/assets";
import multer, { memoryStorage } from "multer";

const fileFilter: MulterFileFilter = (_req, file, cb) => {
  // no file detected
  if (!file) return cb(new Error("No file detected"));
  // no mimetype detected
  if (!file.mimetype) return cb(new Error("no file mimetype detected"));
  // console.log("file :>> ", file);
  const safeFiles = ["png", "image/svg+xml", "jpg", "image/jpeg", "image/png"];
  // TODO: add additional image verifications
  // check if is image
  // const isImage = file.mimetype.split("/")[0] === "image";
  // if (isImage) return cb(null, true);
  // console.log("file :>> ", file);
  //  reject file that are not safe to pass 'false' or pass an error
  !safeFiles.includes(file.mimetype) ? cb(new Error("forbideen file type")) : cb(null, true);
};

// upload file
export const upload = () => multer({ storage: memoryStorage(), fileFilter });
// upload text only
export const uploadTextOnly = () => multer({ storage: memoryStorage(), fileFilter }).none();
// upload mutiple files
export const uploadList = ({ name, count }: MulterUploadList) => {
  return multer({ storage: memoryStorage(), fileFilter }).array(name, count);
};
// upload different types of files
export const uploadFields = (fields: MulterUploadField[]) => {
  return multer({ storage: memoryStorage(), fileFilter }).fields(fields);
};
// upload only one file
export const uploadSingle = (name: string) => multer({ storage: memoryStorage(), fileFilter }).single(name);
