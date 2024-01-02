const updateUser = require("../../db/models/users/updateUser");
const resetCookies = require("../../utils/cookies/resetCookies");

module.exports = async (req, res) => {
  // invalidate session
  await updateUser({ userId: req.user.userId }, { "auth.sessionId": "invalidated" });
  resetCookies(res);
  res.status(202).end();
};
