import type { AuthRequest } from "@app/request";
import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import message from "@db/data/error.message.json";
import { generateHash } from "@utils/auth/generateHash";
import { addNotification } from "@utils/app/addNotification";
import { updateAuthSession } from "@db/models/users/updateUsers";

export const changePassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const oldPassword = req.body.oldPassword;
    // TODO: OPTIMIZE PASSWORD CHANGE
    if (oldPassword) {
      // if password was used previously its a security risk: deny request
      if (req.auth.passwordHistory.includes(oldPassword)) {
        return res.status(400).json(message.passwordAlreadyInHistory).end();
      }
      // add password to the timeline
      req.auth.passwordHistory = [...req.auth.passwordHistory, oldPassword];
    }
    // new to history add old password to history
    req.auth.password = generateHash(req.body.newPassword);
    // notify user of password change
    const n = await addNotification({ type: "edit-user", message: "successfully udpated account password", user: req.user });
    req.user.notifications.push(n._id);
    // save to db
    await req.user.save();
    await updateAuthSession({ id: req.auth._id, auth: req.auth });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
