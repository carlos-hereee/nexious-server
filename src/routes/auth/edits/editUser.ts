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
    const notification = await addNotification({ type: "edit-user", message: "Successfully updated account" });
    if (notification) req.user.notifications.push(notification._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
