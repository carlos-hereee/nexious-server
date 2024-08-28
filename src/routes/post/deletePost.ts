import { PostRequest } from "@app/request";
import { addNotification } from "@utils/app/addNotification";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const deletePost = async (req: PostRequest, res: Response, next: NextFunction) => {
  try {
    // add to archive
    req.project.archivePosts.push(req.post._id);
    // remove from post
    req.project.posts = req.project.posts.filter((p) => p !== req.post._id);
    // create notification
    const n = await addNotification({ type: "appChanges", user: req.user, message: "Successfully removed post" });
    // link notifiction
    if (n) req.project.notifications.push(n._id);
    // save to db
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
