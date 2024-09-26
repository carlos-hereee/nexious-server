import type { AuthRequest } from "@app/request";
import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import messages from "@db/data/error.message.json";
import { generateHash } from "@utils/auth/generateHash";
import { addNotification } from "@utils/app/addNotification";
// import { updateAuthSession } from "@db/models/users/updateUsers";

export const changePassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { passwordAlreadyInHistory, invalidEmailOrPassword, passwordChangeSuccess } = messages;
    // old passwords must match current password
    if (oldPassword && req.auth.password !== generateHash(oldPassword)) {
      return res.status(400).json(invalidEmailOrPassword).end();
    }
    // TODO: OPTIMIZE PASSWORD CHANGE
    if (newPassword) {
      // if password was used previously its a security risk: deny request
      if (req.auth.passwordHistory.includes(newPassword)) {
        return res.status(400).json(passwordAlreadyInHistory).end();
      }
      // add password to the timeline
      req.auth.passwordHistory = [...req.auth.passwordHistory, newPassword];
    }
    // new to history add old password to history
    req.auth.password = generateHash(newPassword);
    // notify user of password change
    const n = await addNotification({ type: "accountChanges", message: `${passwordChangeSuccess}`, user: req.user });
    if (n) req.user.notifications.push(n._id);
    // save to db
    await req.user.save();
    // await updateAuthSession({ id: req.auth._id, auth: req.auth });
    // await req.auth.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
