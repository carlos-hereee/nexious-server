import { updateUser } from "@dbModels/users/updateUser";
import { Request, Response } from "express";
import { resetCookies } from "@authUtils/resetCookies";

export const logout = async (req: Request, res: Response) => {
  if (req.user) {
    // invalidate session
    await updateUser({ userId: req.user.userId }, { "auth.sessionId": "invalidated" });
    resetCookies(res);
    res.status(202).end();
  }
};
