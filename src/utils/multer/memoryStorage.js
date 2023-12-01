// const {GridFStorage} = require('multer')
// const storage = new GridFStorage
const multer = require("multer");

module.exports = multer.memoryStorage();
// module.exports = multer({ storage: storage, fileFilter });
