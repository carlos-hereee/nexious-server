const generateHash = require("../../utils/auth/generateHash");
const random = require("../../utils/auth/random");

module.exports = async (req) => {
  const salt = random();
  const sessionId = generateHash(salt, req.user.userId);
  req.user.sessionId = sessionId;
  await req.user.save;
};
