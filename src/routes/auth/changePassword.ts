import { AuthRequest } from "@app/request";
import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { generateHash } from "@utils/auth/generateHash";

export const changePassword = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const oldPassword = req.body.oldPassword;
    // if password was used previously its a security risk: deny request
    if (req.auth.passwordHistory.includes(oldPassword)) {
      return res.status(400).json(message.passwordAlreadyInHistory).end();
    }
    // add password to the timeline
    req.auth.passwordHistory = [...req.auth.passwordHistory, oldPassword];
    // new to history add old password to history
    req.auth.password = generateHash(req.body.newPassword);
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
