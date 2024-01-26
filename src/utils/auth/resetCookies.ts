import { accessTokenName, refreshTokenName } from "@appUtils/config.js";
import { cookieCongig } from "./cookieCongig.js";
import type { Response } from "express";

export const resetCookies = (res: Response) => {
  const tokenConfig = cookieCongig(0);

  res.cookie(accessTokenName, "", tokenConfig);
  res.cookie(refreshTokenName, "", tokenConfig);
};
