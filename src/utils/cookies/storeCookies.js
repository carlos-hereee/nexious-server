const { accessTokenName, refreshTokenName, isProduction } = require("../../../config.env");
const signJWT = require("../jwt/signJWT");

module.exports = (res, username, sessionId) => {
  const accessToken = signJWT({ username, sessionId }, "5m");
  const refreshToken = signJWT({ sessionId }, "90d");
  res.cookie(accessTokenName, accessToken, {
    maxAge: 300000,
    httpOnly: true,
    secure: isProduction,
  });
  res.cookie(refreshTokenName, refreshToken, {
    maxAge: 3.154e10,
    httpOnly: true,
    secure: isProduction,
  });
  return { accessToken };
};
