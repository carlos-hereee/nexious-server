import { isDev, accessTokenName, refreshTokenName } from "@appUtils/config";
import { getUserAuth } from "@dbModels/users/getUserAuth";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { verifyJWT } from "@authUtils/verifyJWT";
import { NextFunction, Request, Response } from "express";
// import type { AuthRequestHandler } from "@app/auth";
// import type { MiddlewareRequestHandler } from "@app/db";

export const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // key variables
    const accessToken = req.cookies[accessTokenName];
    const refreshToken = req.cookies[refreshTokenName];
    const token = accessToken || refreshToken || "";
    if (!token) {
      if (isDev) console.log("no token", accessToken, refreshToken);
      next();
    }
    // validate token
    const { username, sessionId, error } = verifyJWT(token);
    if (username) req.user = await getUserAuth({ username });
    else if (sessionId) req.user = await getUserAuth({ sessionId });
    else if (error) isDev && console.log("error  verifying JWT", error);
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to deserialize user");
  }
};
