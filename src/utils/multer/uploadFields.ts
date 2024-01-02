import multer from "multer";
import storage from "./memoryStorage";

const fileFilter = (req, file, cb) => {
  const safeFiles = ["png", "image/svg+xml", "jpg"];
  // console.log("file :>> ", file);
  //  reject file that are not safe to pass 'false' or pass an error
  !safeFiles.includes(file.mimetype) ? cb(new Error("forbideen file type")) : cb(null, true);
};

export = () =>
  multer({ storage: storage, fileFilter }).fields([
    { name: "hero", maxCount: 1 },
    { name: "sectionHero", maxCount: 10 },
  ]);
