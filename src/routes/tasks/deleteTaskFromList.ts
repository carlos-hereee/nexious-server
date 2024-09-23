import { AppRequest } from "@app/request";
import { getTaskWithId } from "@db/models/app/getTaskBoard";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const deleteTaskFromList = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const targetList = req.taskBoard.lists.filter((l) => l.listId === req.params.listId);
    // if list not found
    if (!targetList[0]) return res.status(404).json("unable to find task").end();
    const task = await getTaskWithId({ taskId: req.params.taskId });
    // if task not found
    if (!task) return res.status(404).end();

    // remove from tasks
    const update = targetList[0].tasks.filter((t) => t.valueOf() !== task._id.valueOf());
    //  update lists
    req.taskBoard.lists = req.taskBoard.lists.map((list) => {
      if (list.listId === req.params.listId) return { ...list, tasks: update };
      return list;
    });

    // save to db
    await req.taskBoard.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
