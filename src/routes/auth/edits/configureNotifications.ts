import { AuthRequest } from "@app/request";
import Users from "@db/schema/users";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const configureNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { notificationType } = req.params;
    const payload = { ...req.user.notificationSettings, [notificationType]: req.body };
    const update = await Users.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { notificationSettings: payload } },
      { returnOriginal: false }
    );
    if (update) req.user = update;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
