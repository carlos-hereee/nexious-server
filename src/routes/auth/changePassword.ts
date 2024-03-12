import { storeCookies } from "@utils/auth/storeCookies";
import { AuthRequest } from "@app/request";
import { Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { makeSession } from "@utils/auth/makeSession";
import { generateHash } from "@utils/auth/generateHash";

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const oldPassword = req.body.oldPassword;
    if (req.user) {
      // add password to the timeline
      if (!req.auth.passwordHistory.includes(oldPassword)) {
        req.auth.passwordHistory = [...req.auth.passwordHistory, oldPassword];
        // otherwise its a security risk: deny request
      } else return res.status(400).json(message.passwordAlreadyInHistory).end();
      // update password and genereate new sessionId (should log everyone out)
      const sessionId = makeSession(req.user.userId);
      req.auth.sessionId = sessionId;
      // new to history add old password to history
      req.auth.password = generateHash(req.body.newPassword);
      await req.user.save();
      // create new cookies
      const { accessToken } = storeCookies(res, req.user.username, sessionId);
      res.status(200).json(accessToken).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
