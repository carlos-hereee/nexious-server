const multer = require("multer");
const storage = require("./memoryStorage");
// const storage = require("./storage");

module.exports = () =>
  multer({ storage: storage }).fields([
    { name: "hero", maxCount: 1 },
    { name: "sectionHero", maxCount: 10 },
  ]);
