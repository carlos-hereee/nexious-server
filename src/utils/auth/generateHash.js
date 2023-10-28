const crypto = require("crypto");
const { appSecret } = require("../../../config.env");

module.exports = (salt, secret) => {
  const payload = [salt, secret].join("/");
  return crypto.createHmac("sha256", payload).update(appSecret).digest("hex");
};
