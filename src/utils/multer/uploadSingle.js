const multer = require("multer");
// const storage = require("./storage");
const storage = require("./memoryStorage");

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;
  // no mimetype detected
  if (!mimetype) return cb(new Error("no file mimetype detected"));
  // check if is image
  const isImage = mimetype.split("/")[0] === "image";
  if (isImage) return cb(null, true);
  //  reject file that are not safe to pass 'false' or pass an error
  return cb(new Error("forbiden file type"));
};

module.exports = (name) => multer({ storage: storage, fileFilter }).single(name);
