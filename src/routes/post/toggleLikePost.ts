import { PostRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const toggleLikePost = async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    // check if user already liked post
    const isLiked = req.post.likeUsers.includes(req.user.userId);
    if (isLiked) {
      // decrement count
      req.post.likeCount -= 1;
      // remove user like from post
      req.post.likeUsers = req.post.likeUsers.filter((userId) => userId !== req.user.userId);
      // remove like from user history
      req.user.likePosts = req.user.likePosts?.filter((postId) => postId !== req.post.postId);
    } else {
      // increment like count
      req.post.likeCount += 1;
      // add user to like list
      req.post.likeUsers.push(req.user.userId);
      // add post to user liked list
      req.user.likePosts.push(req.post.postId);
    }
    // save to db
    await req.post.save();
    await req.user.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
