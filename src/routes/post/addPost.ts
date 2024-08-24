import { PostRequest } from "@app/request";
import Post from "@db/schema/post";
import { addNotification } from "@utils/app/addNotification";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const addPost = async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    // create post
    // TODO: ADD CREATOR DATA
    const post = await Post.create({ ...req.body, appId: req.project.appId, thumbnail: req.asset || "" });
    if (!post) return res.status(400).json({ message: "unable to create post" }).end();
    // create notification
    const n = await addNotification({ type: "app-update", message: "Successfully added post", user: req.user });
    // link post and notification to app
    req.project.posts.push(post._id);
    req.project.notifications.push(n._id);
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create post");
  }
};
