const { accessTokenName, refreshTokenName, isProduction } = require("../../../config.env");
module.exports = (res) => {
  res.cookie(accessTokenName, "", {
    maxAge: 0,
    httpOnly: true,
    secure: isProduction || undefined,
    sameSite: isProduction && "none",
  });
  res.cookie(refreshTokenName, "", {
    maxAge: 0,
    httpOnly: true,
    secure: isProduction || undefined,
    sameSite: isProduction && "none",
  });
};
