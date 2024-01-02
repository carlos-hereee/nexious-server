import { accessTokenName, refreshTokenName }  from "../../../config.env";
import cookieCongig  from "./cookieCongig";
module.exports = (res) => {
  const tokenConfig = cookieCongig(0);

  res.cookie(accessTokenName, "", tokenConfig);
  res.cookie(refreshTokenName, "", tokenConfig);
};
