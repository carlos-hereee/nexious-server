import { accessTokenName, refreshTokenName } from "@utils/app/config";
import { cookieCongig } from "./cookieCongig";
import type { Response } from "express";

export const resetCookies = (res: Response) => {
  const tokenConfig = cookieCongig(0);

  res.cookie(accessTokenName, "", tokenConfig);
  res.cookie(refreshTokenName, "", tokenConfig);
};
