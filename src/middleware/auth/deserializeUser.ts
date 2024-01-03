import { isDev, accessTokenName, refreshTokenName } from "@config";
import getUserAuth from "@dbModels/users/getUserAuth";
import { useGenericErrors } from "../../utils/auth/useGenericErrors";
import verifyJWT from "../../utils/jwt/verifyJWT";

export const deserializeUser = (req, res, next) => {
  try {
    // key variables
    const accessToken = req.cookies[accessTokenName];
    // console.log("accessToken :>> ", accessToken);
    // console.log("accessTokenName :>> ", accessTokenName);
    const refreshToken = req.cookies[refreshTokenName];
    const token = accessToken || refreshToken || "";
    if (!token) isDev && console.log("no token", accessToken, refreshToken) && next();
    // validate token
    const { username, sessionId, error } = verifyJWT(token);
    if (error.error) isDev && console.log("error  verifying JWT", error);
    if (username) req.user = await getUserAuth({ username });
    else if (sessionId) req.user = await getUserAuth({ sessionId });
    next();
  } catch (error) {
    useGenericErrors(res, error);
  }
};
