import { AuthRequest } from "@app/request";
import { getPost } from "@db/models/posts/getPosts";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const toggleLikePost = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const post = await getPost({ postId: req.params.postId });
    if (!post) return res.status(404).json("Post not found").end();
    // check if user already liked post
    const isLiked = post.likeUsers.includes(req.user.userId);
    if (isLiked) {
      // decrement count
      post.likeCount -= 1;
      // remove user like from post
      post.likeUsers = post.likeUsers.filter((userId) => userId !== req.user.userId);
      // remove like from user history
      req.user.likePosts = req.user.likePosts?.filter((postId) => postId !== post.postId);
    } else {
      // increment like count
      post.likeCount += 1;
      // add user to like list
      post.likeUsers.push(req.user.userId);
      // add post to user liked list
      req.user.likePosts.push(post.postId);
    }
    // save to db
    await post.save();
    await req.user.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
