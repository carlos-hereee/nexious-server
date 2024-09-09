import { AppRequest } from "@app/request";
import Tasks from "@db/schema/tasks";
import { generateUsername } from "@utils/app/generateStr";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

interface B {
  name: string;
  description: string;
  dueDate: string;
}
export const createTask = async (req: AppRequest<B>, res: Response) => {
  try {
    // create task
    const task = await Tasks.create({
      ...req.body,
      createdBy: { name: generateUsername(req.user), avatar: req.user.avatar, userId: req.user.userId },
    });

    const listIdx = req.taskBoard.lists.findIndex((list) => list.listId === req.params.listId);

    if (listIdx < 0) return res.status(404).json("unable to find list item").end();
    if (req.taskBoard.lists[listIdx]) {
      // add task to list
      req.taskBoard.lists[listIdx]?.tasks.push(task._id);
      // save to db
      await req.taskBoard.save();
    }
    await req.project.populate("taskBoards");

    return res.status(200).json(req.project.taskBoards).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
