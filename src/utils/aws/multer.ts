import multer from "multer";

const fileFilter = (_req, file, cb) => {
  // no mimetype detected
  if (!file.mimetype) return cb(new Error("no file mimetype detected"));
  const safeFiles = ["png", "image/svg+xml", "jpg"];
  // TODO: add additional image verifications
  // check if is image
  // const isImage = file.mimetype.split("/")[0] === "image";
  // if (isImage) return cb(null, true);
  // console.log("file :>> ", file);
  //  reject file that are not safe to pass 'false' or pass an error
  !safeFiles.includes(file.mimetype) ? cb(new Error("forbideen file type")) : cb(null, true);
};

// for saving files on the cloud
export const storage = multer.memoryStorage();

// upload file
export const upload = () => multer({ storage: storage, fileFilter });
// upload text only
export const uploadTextOnly = () => multer({ storage: storage, fileFilter }).none();
// upload mutiple files
export const uploadList = (name: string, count: number) =>
  multer({ storage: storage, fileFilter }).array(name, count);
// upload different types of files
export const uploadFields = () =>
  multer({ storage: storage, fileFilter }).fields([
    { name: "hero", maxCount: 1 },
    { name: "sectionHero", maxCount: 10 },
  ]);
// upload only one file
export const uploadSingle = (name: string) => multer({ storage: storage, fileFilter }).single(name);
// for saving static files on machine
// export const storage = multer.diskStorage({
//   // where should files be stored on disk
//   destination: (req, file, cb) => cb(null, "public"),
//   filename: (req, file, cb) => {
//     // console.log("req :>> ", req.body);
//     // console.log("file :>> ", file);
//     cb(null, Date.now() + "-" + file.originalname);
//   },
//   fileFilter: (req, file, cb) => {
//     const safeFiles = ["png", "image/svg+xml", "jpg"];
//     //  reject file that are not safe to pass 'false' or pass an error
//     !safeFiles.includes(file.minetype) ? cb(new Error("forbideen file type")) : cb(null, true);
//   },
// });
