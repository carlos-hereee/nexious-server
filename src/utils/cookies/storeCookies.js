const { accessTokenName, refreshTokenName, isProduction } = require("../../../config.env");
const signJWT = require("../jwt/signJWT");

module.exports = (res, username, sessionId) => {
  const accessToken = signJWT({ username, sessionId }, "1d");
  const refreshToken = signJWT({ sessionId }, "90d");
  res.cookie(accessTokenName, accessToken, {
    maxAge: Date.now() + 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: isProduction || undefined,
    sameSite: isProduction && "none",
  });
  res.cookie(refreshTokenName, refreshToken, {
    maxAge: Date.now() + 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
    secure: isProduction || undefined,
    sameSite: isProduction && "none",
  });
  return { accessToken };
};
