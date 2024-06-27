import { NotificationSchema } from "@app/db";
import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const deleteNotification = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // key varibles
    const { notificationId } = req.params;
    // TODO: ADD REMOVED NOTIFICATION TO ARCHIVE
    req.project.notifications = req.project.notifications.filter(
      (n) => (n as unknown as NotificationSchema).notificationId !== notificationId
    );
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove notification from app");
  }
};
