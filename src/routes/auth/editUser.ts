import { AuthRequest } from "@app/request";
import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { formatNotification } from "@utils/app/format/formatNotification";
import { createNotification } from "@db/models/notification/createNotification";

export const editUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { username, email, phone, nickname } = req.body;
    // update user data if changes
    if (username !== req.user.username) req.user.username = username;
    if (email !== req.user.email) req.user.email = email;
    if (phone !== req.user.phone) req.user.phone = phone;
    if (nickname !== req.user.nickname) req.user.nickname = nickname;
    // create notification
    const notificationData = formatNotification({ type: "edit-user" });
    const notification = await createNotification(notificationData);
    if (notification) req.user.notifications.push(notification._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
