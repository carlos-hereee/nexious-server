const getUser = require("../../db/models/users/getUser");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  try {
    // made it through the forest, create new session cookie
    const sessionId = req.user.auth.sessionId;
    const username = req.user.username;
    const { accessToken } = storeCookies(res, username, sessionId);
    const user = await getUser({ userId: req.user.userId });
    res.status(200).json({ accessToken, user }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured sending token");
  }
};
