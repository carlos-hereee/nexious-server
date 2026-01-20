import { AppRequest } from "@app/request";
import { getTaskWithId } from "@db/models/app/getTaskBoard";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const deleteTaskFromList = async (req: AppRequest, res: Response) => {
  try {
    const targetList = req.taskBoard.lists.filter((l) => l.listId === req.params.listId)[0];
    // if list not found
    if (!targetList) return res.status(404).json("unable to find task").end();
    const task = await getTaskWithId({ taskId: req.params.taskId });
    // if task not found
    if (!task) return res.status(404).end();

    // remove from tasks
    const update = targetList.tasks.filter((t) => t.valueOf() !== task._id.valueOf());

    // //  update lists
    req.taskBoard.lists = req.taskBoard.lists.map((list) => {
      if (list.listId === req.params.listId) return { ...list, tasks: update };
      return list;
    });

    // // save to db
    await req.taskBoard.save();
    return res.status(200).json(req.taskBoard.lists).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
