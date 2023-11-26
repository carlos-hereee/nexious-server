// const getUser = require("../../db/models/users/getUser");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  try {
    // made it through the forest, generate session cookie
    const sessionId = req.user.auth.sessionId;
    if (sessionId) {
      const username = req.user.username;
      const { accessToken } = storeCookies(res, username, sessionId);
      return res.status(200).json(accessToken).end();
    }
    return res.status(400).json("Unable to login try again later").end();
  } catch (error) {
    useGenericErrors(res, error, "error occured sending token");
  }
};
