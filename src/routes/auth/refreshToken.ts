import { makeSession } from "@utils/auth/makeSession";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { storeCookies } from "@utils/auth/storeCookies";
import { Response } from "express";
import { AuthRequest } from "@app/request";

export const refreshToken = async (req: AuthRequest, res: Response) => {
  try {
    if (req.auth) {
      // access granted: generate new sessionId
      const sessionId = makeSession(req.user.userId);
      req.auth.sessionId = sessionId;
      await req.auth.save();
      // create  cookies
      const { accessToken } = storeCookies(res, req.user.username, sessionId);
      res.status(200).json(accessToken).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "refresh token errror");
  }
};
