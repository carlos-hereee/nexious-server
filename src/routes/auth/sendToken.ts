import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { storeCookies } from "@utils/auth/storeCookies";
import { Response } from "express";
import { UserRequest } from "@app/request";

export const sendToken = (req: UserRequest, res: Response) => {
  try {
    // made it through the forest, generate session cookie
    const sessionId = req.user?.auth.sessionId;
    // console.log("req.user :>> ", req.user);
    if (sessionId) {
      const { accessToken } = storeCookies(res, req.user?.username || "", sessionId);
      return res.status(200).json(accessToken).end();
    }
    return res.status(400).json("Unable to login try again later").end();
  } catch (error) {
    useGenericErrors(res, error, "error occured sending token");
  }
};
