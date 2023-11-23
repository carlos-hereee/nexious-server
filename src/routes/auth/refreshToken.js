const getUser = require("../../db/models/users/getUser");
const makeSession = require("../../utils/auth/makeSession");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const storeCookies = require("../../utils/cookies/storeCookies");

module.exports = async (req, res) => {
  try {
    // access granted: generate new sessionId
    const sessionId = makeSession(req.user.userId);
    req.user.auth.sessionId = sessionId;
    await req.user.save();
    // create  cookies
    // const user = await getUser({ userId: req.user.userId });
    const { accessToken } = storeCookies(res, req.user.username, sessionId);
    // console.log("accessToken :>> ", accessToken);
    res.status(200).json(accessToken).end();
  } catch (error) {
    useGenericErrors(res, error, "refresh token errror");
  }
};
