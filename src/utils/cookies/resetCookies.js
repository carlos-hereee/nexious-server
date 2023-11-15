const { accessTokenName, refreshTokenName } = require("../../../config.env");
module.exports = (res) => {
  res.cookie(accessTokenName, "", { maxAge: 0, httpOnly: true });
  res.cookie(refreshTokenName, "", { maxAge: 0, httpOnly: true });
};
