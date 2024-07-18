import type { AppRequest } from "@app/request";
import { updateApp } from "@db/models/app/updateApp";
import { getNotification } from "@db/models/notification/getNotification";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const deleteNotification = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const notification = await getNotification({ notificationId: req.params.notificationId });
    if (notification) {
      const notificationId = notification._id;
      await updateApp({ appId: req.project.appId, type: "remove-notification", notificationId });
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to remove notification from app");
  }
};
