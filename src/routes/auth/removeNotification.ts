import type { AuthRequest } from "@app/request";
import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { INotificationSchema } from "@app/db";

export const removeNotification = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { notificationId } = req.params;

    await req.user.populate("notifications");
    // clear notification
    req.user.notifications = req.user.notifications.filter((n) => {
      const notification = n as unknown as INotificationSchema;
      return notification.notificationId !== notificationId;
    });
    // add it to archive
    req.user.archivedNotifications.push(notificationId);
    // save to db
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
