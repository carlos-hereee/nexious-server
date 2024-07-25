import { PostRequest } from "@app/request";
import { getPosts } from "@db/models/posts/getPosts";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const fetchPosts = async (req: PostRequest, res: Response) => {
  try {
    // create post
    const { appId } = req.params;

    const posts = await getPosts({ appId });
    res.status(200).json(posts).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to create post");
  }
};
