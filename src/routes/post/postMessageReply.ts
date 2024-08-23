import { PostRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const postMessageReply = async (req: PostRequest<{ data: string }>, res: Response, next: NextFunction) => {
  try {
    const { avatar, userId, nickname, username, email } = req.user;
    const name = nickname || req.user.name || username || email;
    // create message
    // l
    req.message.replies.push({ ...req.body, user: { avatar, userId, name } });
    await req.message.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
