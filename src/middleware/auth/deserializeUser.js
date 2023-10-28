const { isDev, accessTokenName, refreshTokenName } = require("../../../config.env");
const getUserAuth = require("../../db/models/users/getUserAuth");
const useGenericErrors = require("../../utils/auth/useGenericErrors");
const verifyJWT = require("../../utils/jwt/verifyJWT");

module.exports = async (req, res, next) => {
  try {
    // key variables
    const accessToken = req.cookies[accessTokenName];
    const refreshToken = req.cookies[refreshTokenName];
    const token = accessToken ? accessToken : refreshToken ? refreshToken : "";
    if (!token) isDev && console.log("no token", accessToken, refreshToken) && next();
    // validate token
    const { username, sessionId, error } = verifyJWT(token);
    if (error.error) isDev && console.log("error  verifying JWT", error);
    if (username) req.user = await getUserAuth({ username });
    else if (sessionId) req.user = await getUserAuth({ sessionId });
    next();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
