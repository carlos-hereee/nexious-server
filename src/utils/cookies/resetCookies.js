const { accessTokenName, refreshTokenName } = require("../../../config.env");
const cookieCongig = require("./cookieCongig");
module.exports = (res) => {
  const tokenConfig = cookieCongig(0);

  res.cookie(accessTokenName, "", tokenConfig);
  res.cookie(refreshTokenName, "", tokenConfig);
};
