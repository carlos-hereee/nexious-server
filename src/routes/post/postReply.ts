import { PostRequest } from "@app/request";
import Messages from "@db/schema/messages";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const postReply = async (req: PostRequest<{ data: string }>, res: Response, next: NextFunction) => {
  try {
    const { avatar, userId } = req.user;
    const name = generateUsername(req.user);
    // create message
    const message = await Messages.create({ ...req.body, user: { avatar, userId, name } });
    // link message to post comments
    req.post.comments.push(message._id);
    //  save to db
    await req.post.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
