import { AppRequest } from "@app/request";
import { getTaskWithId } from "@db/models/app/getTaskBoard";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
// import type { ObjectId } from "mongodb";

export const deleteTaskFromList = async (req: AppRequest, res: Response) => {
  try {
    const listIdx = req.taskBoard.lists.findIndex((l) => l.listId === req.params.listId);
    // if list not found
    if (listIdx < 0 || !req.taskBoard.lists[listIdx]) return res.status(404).end();

    if (typeof req.taskBoard.lists[listIdx].tasks[0] !== "string") {
      const taskIdx = req.taskBoard.lists[listIdx].tasks.findIndex((t) => t.toString() === req.params.taskId);
      const task = await getTaskWithId({ id: req.taskBoard.lists[listIdx].tasks[taskIdx] });
      //  task not found
      if (!task) {
        req.taskBoard.lists[listIdx].tasks = req.taskBoard.lists[listIdx].tasks.filter(
          (t) => t.toString() !== req.params.taskId
        );
      }
    }
    // save to db
    await req.taskBoard.save();

    return res.status(200).json(req.taskBoard).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
