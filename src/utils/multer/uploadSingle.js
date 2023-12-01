const multer = require("multer");
// const storage = require("./storage");
const storage = require("./memoryStorage");

const fileFilter = (req, file, cb) => {
  const safeFiles = ["png", "image/svg+xml", "jpg"];
  //  reject file that are not safe to pass 'false' or pass an error
  !safeFiles.includes(file.minetype) ? cb(new Error("forbideen file type")) : cb(null, true);
};

module.exports = (name) => multer({ storage: storage, fileFilter }).single(name);
