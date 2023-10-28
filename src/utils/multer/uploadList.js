const multer = require("multer");

module.exports = (name, count) => multer({ storage: storage }).array(name, count);
