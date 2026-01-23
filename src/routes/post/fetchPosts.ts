import { PostRequest } from "@app/request";
import { getPosts } from "@db/models/posts/getPosts";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const fetchPosts = async (req: PostRequest, res: Response) => {
  try {
    // create post
    const { appId } = req.params;
    const { query } = req;

    const posts = await getPosts({ appId, limit: Number(query.limit), page: Number(query.page) });
    if (posts.length === 0) return res.status(204).end();
    return res.status(200).json(posts).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to create post");
  }
};
