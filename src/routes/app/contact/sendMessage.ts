import { AppRequest } from "@app/request";
import Messages from "@db/schema/messages";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const sendMessage = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    if (req.project) {
      const user = {
        avatar: req.user.avatar,
        userId: req.user.userId,
        name: req.user.name || req.user.nickname || req.user.email,
      };
      // create message
      const message = await Messages.create({ ...req.body, user, recipientRole: "app-support" });
      // link message
      req.user.messages.push(message._id);
      req.project.messages.push(message._id);
      // save to db
      await req.user.save();
      await req.project.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add Message ");
  }
};
