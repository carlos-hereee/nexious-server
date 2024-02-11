import { isDev, accessTokenName, refreshTokenName } from "@utils/app/config";
import { getUserAuth } from "@db/models/users/getUserAuth";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { verifyJWT } from "@utils/auth/verifyJWT";
import { NextFunction, Response } from "express";
import { DeserializeUserRequest } from "@app/request";
// import type { AuthRequestHandler } from "@app/auth";
// import type { MiddlewareRequestHandler } from "@app/db";

export const deserializeUser = async (req: DeserializeUserRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const accessToken = req.cookies[accessTokenName];
    const refreshToken = req.cookies[refreshTokenName];
    const token = accessToken || refreshToken || "";
    if (!token) {
      if (isDev) console.log("no token", accessToken, refreshToken);
      return next();
    }
    // validate token
    const { username, sessionId, error } = verifyJWT(token);
    if (username) req.user = await getUserAuth({ username });
    else if (sessionId) req.user = await getUserAuth({ sessionId });
    else if (error) isDev && console.log("error  verifying JWT", error);
    return next();
  } catch (error) {
    useGenericErrors(res, error, "unable to deserialize user");
  }
};
