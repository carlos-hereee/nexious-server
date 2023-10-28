const getUser = require("../../db/models/users/getUser");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  try {
    // made it through the forest, create new session cookie
    const sessionId = req.user.auth.sessionId;
    const { accessToken } = storeCookies(res, req.user.username, sessionId);
    const user = await getUser({ username: req.user.username });
    res.status(200).json({ accessToken, user }).end();
  } catch (error) {
    useGenericErrors(res, res);
  }
};
