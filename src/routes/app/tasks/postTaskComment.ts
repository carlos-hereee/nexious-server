import { AppRequest } from "@app/request";
import { getTaskWithId } from "@db/models/app/getTaskBoard";
import Messages from "@db/schema/messages";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const postTaskComment = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // let isPosted = false;
    // const { avatar, userId } = req.user;
    // const name = generateUsername(req.user);
    const task = await getTaskWithId({ taskId: req.params.taskId });
    console.log("task :>> ", task);

    // create message
    // const message = await Messages.create({ ...req.body, user: { avatar, userId, name } });
    // req.taskBoard.lists.map((list) => {
    //   if (list.listId === req.params.listId) {
    //     return list.tasks.map((task) => {
    //       if (task.taskId === req.params.taskId) {
    //         isPosted = true;
    //         return task.comments?.push(message._id);
    //       }
    //       return task;
    //     });
    //   }
    //   return list;
    // });
    // if (isPosted) return res.status(404).json("unable to find task list");
    // console.log("updatedTasks :>> ", updatedTasks);
    // next();
    return;
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
