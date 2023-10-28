const jwt = require("jsonwebtoken");
const { jwtPrivateKey } = require("../../../config.env");

module.exports = (payload, expiresIn) => {
  return jwt.sign(payload, jwtPrivateKey, { algorithm: "HS256", expiresIn });
};
