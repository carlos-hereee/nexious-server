import multer  from "multer";
import storage  from "./storage";

export  (name, count) => multer({ storage: storage }).array(name, count);
