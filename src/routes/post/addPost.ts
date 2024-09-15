import { PostRequest } from "@app/request";
import Post from "@db/schema/post";
import { addNotification } from "@utils/app/addNotification";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const addPost = async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    const name = generateUsername(req.user);
    const createdBy = { avatar: req.user.avatar, name, userId: req.user.userId, role: "owner" };
    const appId = req.project ? req.project.appId : "";
    // create post
    const post = await Post.create({ ...req.body, appId, createdBy, thumbnail: req.asset || "" });
    if (!post) return res.status(400).json({ message: "unable to create post" }).end();
    // create notification
    const n = await addNotification({ type: "activityAlerts", message: "Successfully added post", user: req.user });
    if (req.project) {
      // link post and notification to app
      req.project.posts.push(post._id);
      if (n) req.project.notifications.push(n._id);
      await req.project.save();
    }
    // link post and notification to user
    req.user.feed.push(post._id);
    if (n) req.user.notifications.push(n._id);
    await req.user.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to create post");
  }
};
