import crypto  from "crypto";

export  () => crypto.randomBytes(128).toString("base64");
