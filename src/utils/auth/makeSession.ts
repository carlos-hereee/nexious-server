const generateHash = require("../../utils/auth/generateHash");
const random = require("../../utils/auth/random");

module.exports = (payload) => {
  const salt = random();
  return generateHash(salt, payload);
};
