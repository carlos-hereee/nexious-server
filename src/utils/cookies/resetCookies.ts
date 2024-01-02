import { accessTokenName, refreshTokenName } from "@config";
import cookieCongig from "./cookieCongig";
export = (res) => {
  const tokenConfig = cookieCongig(0);

  res.cookie(accessTokenName, "", tokenConfig);
  res.cookie(refreshTokenName, "", tokenConfig);
};
