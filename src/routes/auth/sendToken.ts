import { storeCookies } from "@utils/auth/storeCookies";
import { Response } from "express";
import { AuthRequest } from "@app/request";

export const sendToken = (req: AuthRequest, res: Response) => {
  // made it through the forest, generate session cookie
  const sessionId = req.auth.sessionId;
  if (sessionId) {
    // create  cookies
    const { accessToken } = storeCookies(res, req.user.username, sessionId);
    return res.status(200).json(accessToken).end();
  }
  return res.status(400).json("Unable to login try again later").end();
};
