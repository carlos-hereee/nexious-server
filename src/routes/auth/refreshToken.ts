// import getUser  from "@db/models/users/getUser";
import { makeSession } from "@utils/auth/makeSession";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { storeCookies } from "@utils/auth/storeCookies";
import { Response } from "express";
import { UserRequest } from "@app/request";

export const refreshToken = async (req: UserRequest, res: Response) => {
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
