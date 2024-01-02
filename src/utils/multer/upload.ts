import multer  from "multer";
import storage  from "./storage";

module.exports = multer({ storage: storage });
