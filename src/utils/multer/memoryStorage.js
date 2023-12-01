// const {GridFStorage} = require('multer')
// const storage = new GridFStorage
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  const safeFiles = ["png", "image/svg+xml", "jpg"];
  //  reject file that are not safe to pass 'false' or pass an error
  !safeFiles.includes(file.minetype) ? cb(new Error("forbideen file type")) : cb(null, true);
};

const storage = multer.memoryStorage();
module.exports = multer({ storage: storage, fileFilter });
