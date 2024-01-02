import { accessTokenName, refreshTokenName } from "@config";
import signJWT from "../jwt/signJWT";
import cookieCongig from "./cookieCongig";

export = (res, username, sessionId) => {
  const accessConfig = cookieCongig(24);
  const refreshConfig = cookieCongig(24 * 30 * 3);

  // console.log("accessConfig :>> ", accessConfig);

  const accessToken = signJWT({ username, sessionId }, "1d");
  const refreshToken = signJWT({ sessionId }, "90d");
  res.cookie(accessTokenName, accessToken, accessConfig);
  res.cookie(refreshTokenName, refreshToken, refreshConfig);
  return { accessToken };
};
