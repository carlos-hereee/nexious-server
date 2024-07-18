import type { AuthRequest } from "@app/request";
import { NextFunction, Response } from "express";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { updateUserNotification } from "@db/models/users/updateUsers";
import { getNotification } from "@db/models/notification/getNotification";

export const removeNotification = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const notification = await getNotification({ notificationId: req.params.notificationId });
    if (notification) {
      const notificationId = notification.notificationId;
      await updateUserNotification({ userId: req.user._id, type: "remove-notification", notificationId });
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to update password");
  }
};
