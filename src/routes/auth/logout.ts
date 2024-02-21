import { Response } from "express";
import { resetCookies } from "@utils/auth/resetCookies";
import { AuthRequest } from "@app/request";

export const logout = async (req: AuthRequest, res: Response) => {
  if (req.auth) {
    // invalidate session
    req.auth.sessionId = "invalidated";
    await req.auth.save();
    resetCookies(res);
  }
  return res.status(202).end();
};
