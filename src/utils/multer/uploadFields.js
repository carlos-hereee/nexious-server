const multer = require("multer");
const storage = require("./storage");

module.exports = (fields) => {
  const uploads = fields.map((f) => {
    return { name: f, maxCount: 1 };
  });
  return multer({ storage: storage }).fields(uploads);
};
