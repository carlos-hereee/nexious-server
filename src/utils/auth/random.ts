import crypto  from "crypto";

module.exports = () => crypto.randomBytes(128).toString("base64");
