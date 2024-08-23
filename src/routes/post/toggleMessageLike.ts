import { PostRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const toggleMessageLike = async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    // check if user already liked post
    const isLiked = req.message.status.messageLikes.includes(req.user.userId);
    if (isLiked) {
      // decrement count
      req.message.status.likeCount -= 1;
      // remove user like from post
      req.message.status.messageLikes = req.message.status.messageLikes.filter((userId) => userId !== req.user.userId);
      // remove like from user history
      req.user.likeMessages = req.user.likeMessages?.filter((postId) => postId !== req.message.messageId);
    } else {
      // increment like count
      req.message.status.likeCount += 1;
      // add user to like list
      req.message.status.messageLikes.push(req.user.userId);
      // add post to user liked list
      req.user.likeMessages.push(req.message.messageId);
    }
    // save to db
    await req.user.save();
    await req.message.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
