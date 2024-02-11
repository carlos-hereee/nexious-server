import { Response } from "express";
import { resetCookies } from "@utils/auth/resetCookies";
import { UserRequest } from "@app/request";
// import { updateUser } from "@db/models/users/updateUser";

export const logout = async (req: UserRequest, res: Response) => {
  if (req.user) {
    // invalidate session
    req.user.auth.sessionId = "invalidated";
    await req.user.save();
    // await updateUser({ userId: req.user.userId }, { "auth.sessionId": "invalidated" });
    resetCookies(res);
    res.status(202).end();
  }
};
