// import getUser  from "@dbModels/users/getUser";
import { makeSession } from "@authUtils/makeSession.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { storeCookies } from "@authUtils/storeCookies.js";
import type { RequestHandler } from "express";

export const refreshToken: RequestHandler = async (req, res) => {
  try {
    if (req.user) {
      // access granted: generate new sessionId
      const sessionId = makeSession(req.user.userId);
      req.user.auth.sessionId = sessionId;
      await req.user.save();
      // create  cookies
      // const user = await getUser({ userId: req.user.userId });
      const { accessToken } = storeCookies(res, req.user.username, sessionId);
      // console.log("accessToken :>> ", accessToken);
      res.status(200).json(accessToken).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "refresh token errror");
  }
};
