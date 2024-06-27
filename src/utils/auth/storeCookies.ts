import { accessTokenName, refreshTokenName } from "@utils/app/config";
import { cookieCongig } from "./cookieCongig";
import type { StoreCookiesProps } from "@app/auth";
import { signJWT } from "./JWT";

export const storeCookies: StoreCookiesProps = (res, username, sessionId) => {
  const accessConfig = cookieCongig(24);
  const refreshConfig = cookieCongig(24 * 30 * 3);

  const accessToken = signJWT({ username, sessionId }, "10d");
  const refreshToken = signJWT({ sessionId }, "90d");
  res.cookie(accessTokenName, accessToken, accessConfig);
  res.cookie(refreshTokenName, refreshToken, refreshConfig);
  return { accessToken };
};
