import { AppRequest } from "@app/request";
import { getTaskWithId } from "@db/models/app/getTaskBoard";
import Messages from "@db/schema/messages";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response, NextFunction } from "express";

export const postTaskComment = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // require task
    const task = await getTaskWithId({ taskId: req.params.taskId });
    if (!task) return res.status(404).end();

    // create message
    const { avatar, userId } = req.user;
    const name = generateUsername(req.user);
    const message = await Messages.create({ ...req.body, user: { avatar, userId, name } });
    // link message to task
    task.comments.push(message._id);
    // save
    await task.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
