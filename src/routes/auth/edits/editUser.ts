import type { AuthRequest } from "@app/request";
import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { addNotification } from "@utils/app/addNotification";
import type { IAuth } from "@app/auth";

export const editUser = async (req: AuthRequest<IAuth>, res: Response, next: NextFunction) => {
  try {
    const { username, email, phone, name } = req.body;
    const nickname = req.body.nickname || name || username || email || "";
    // update user data if changes
    if (username !== req.user.username) req.user.username = username;
    if (email !== req.user.email) req.user.email = email;
    if (phone !== req.user.phone) req.user.phone = phone;
    if (nickname !== req.user.nickname) req.user.nickname = nickname;
    if (name !== req.user.name) req.user.name = name;
    // create notification
    const n = await addNotification({ type: "accountChanges", message: "Successfully updated account", user: req.user });
    console.log("n :>> ", n);
    return;
    if (n) req.user.notifications.push(n._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
