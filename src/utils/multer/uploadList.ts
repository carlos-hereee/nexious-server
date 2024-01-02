import multer  from "multer";
import storage  from "./storage";

module.exports = (name, count) => multer({ storage: storage }).array(name, count);
