const crypto = require("crypto");

module.exports = () => crypto.randomBytes(128).toString("base64");
