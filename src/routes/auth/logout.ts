import { updateUser } from "@dbModels/users/updateUser.js";
import type { RequestHandler } from "express";
import { resetCookies } from "@authUtils/resetCookies.js";

export const logout: RequestHandler = async (req, res) => {
  if (req.user) {
    // invalidate session
    await updateUser({ userId: req.user.userId }, { "auth.sessionId": "invalidated" });
    resetCookies(res);
    res.status(202).end();
  }
};
