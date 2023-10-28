const multer = require("multer");
const storage = require("./storage");

module.exports = (name) => multer({ storage: storage }).single(name);
