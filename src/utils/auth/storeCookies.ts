import { accessTokenName, refreshTokenName } from "@appUtils/config";
import { signJWT } from "./signJWT";
import { cookieCongig } from "./cookieCongig";
import type { StoreCookiesProps } from "@app/auth";

export const storeCookies: StoreCookiesProps = (res, username, sessionId) => {
  const accessConfig = cookieCongig(24);
  const refreshConfig = cookieCongig(24 * 30 * 3);

  // console.log("accessConfig :>> ", accessConfig);

  const accessToken = signJWT({ username, sessionId }, "1d");
  const refreshToken = signJWT({ sessionId }, "90d");
  res.cookie(accessTokenName, accessToken, accessConfig);
  res.cookie(refreshTokenName, refreshToken, refreshConfig);
  return { accessToken };
};
