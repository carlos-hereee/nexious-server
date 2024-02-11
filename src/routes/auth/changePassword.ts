import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { storeCookies } from "@utils/auth/storeCookies";
import { UserRequest } from "@app/request";
import { Response } from "express";

export const changePassword = (req: UserRequest, res: Response) => {
  try {
    // create new cookies
    const { accessToken } = storeCookies(res, req.user.username, req.user.auth.sessionId);
    res.status(200).json(accessToken).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to change password");
  }
};
