import { PostRequest } from "@app/request";
import { getPost } from "@db/models/posts/getPosts";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const requirePost = async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    const post = await getPost({ postId: req.params.postId });
    if (!post) return res.status(404).json("Post not found").end();
    req.post = post;
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find post");
  }
};
