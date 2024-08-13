import { AppRequest } from "@app/request";
import Messages from "@db/schema/messages";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const sendPlatformMessage = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.project) {
      // create message
      const message = await Messages.create({
        ...req.body,
        user: {
          avatar: req.user.avatar,
          userId: req.user.userId,
          name: req.user.name || req.user.nickname || req.user.email,
        },
        recipientRole: "dev-team",
      });
      // link message
      req.user.messages.push(message._id);
      await req.user.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add Message ");
  }
};
