import { isDev, accessTokenName, refreshTokenName } from "@utils/app/config";
import { getUserAuthWithSession, getUserAuthWithUsername } from "@db/models/users/getUser";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { verifyJWT } from "@utils/auth/verifyJWT";
import { NextFunction, Response } from "express";
import { InitRequest } from "@app/request";

export const deserializeUser = async (req: InitRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const accessToken = req.cookies[accessTokenName];
    const refreshToken = req.cookies[refreshTokenName];
    const token = accessToken || refreshToken || "";
    // skip if no token
    if (!token) {
      if (isDev) console.log("no token", accessToken, refreshToken);
      return next();
    }
    // validate token
    const { username, sessionId, error } = verifyJWT(token);
    // if username was found in payload search user with username
    if (username) {
      const user = await getUserAuthWithUsername({ username });
      if (user) req.user = user;
      // otherwise search with sessionid
    } else if (sessionId) {
      const user = await getUserAuthWithSession({ sessionId });
      if (user) req.user = user;
    } else if (error) isDev && console.log("error  verifying JWT", error);
    return next();
  } catch (error) {
    useGenericErrors(res, error, "unable to deserialize user");
  }
};
