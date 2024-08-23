import { PostRequest } from "@app/request";
import Messages from "@db/schema/messages";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const postMessageReply = async (req: PostRequest<{ data: string }>, res: Response, next: NextFunction) => {
  try {
    const { avatar, userId, nickname, username, email } = req.user;
    const name = nickname || req.user.name || username || email;
    // increment nest level
    const nestLevel = req.message.status.nestLevel + 1;
    // create message
    const message = await Messages.create({ ...req.body, user: { avatar, userId, name }, status: { nestLevel } });
    // link message in replies
    req.message.replies.push(message._id);
    // save to db
    await req.message.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
