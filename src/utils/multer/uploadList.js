const multer = require("multer");
const storage = require("./storage");

module.exports = (name, count) => multer({ storage: storage }).array(name, count);
