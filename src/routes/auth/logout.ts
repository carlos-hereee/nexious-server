import { updateUser } from "@dbModels/users/updateUser";
import { Response } from "express";
import { resetCookies } from "@authUtils/resetCookies";
import { UserRequest } from "@app/request";

export const logout = async (req: UserRequest, res: Response) => {
  if (req.user) {
    // invalidate session
    await updateUser({ userId: req.user.userId }, { "auth.sessionId": "invalidated" });
    resetCookies(res);
    res.status(202).end();
  }
};
