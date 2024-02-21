import { accessTokenName, refreshTokenName } from "@utils/app/config";
import { getUser } from "@db/models/users/getUser";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { verifyJWT } from "@utils/auth/verifyJWT";
import { NextFunction, Response } from "express";
import { InitRequest } from "@app/request";
import { getSession } from "@db/models/users/getSession";

export const deserializeUser = async (req: InitRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const accessToken = req.cookies[accessTokenName];
    const refreshToken = req.cookies[refreshTokenName];
    const token = accessToken || refreshToken || "";
    // skip if no token
    if (!token) next();
    // validate token
    const { username, sessionId } = verifyJWT(token);
    // assign user
    if (username) req.user = await getUser({ username });
    // TODO: get user instead of session
    else if (sessionId) req.auth = await getSession({ sessionId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to deserialize user");
  }
};
