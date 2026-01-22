import { AppRequest } from "@app/request";
import { TaskList } from "@app/tasks";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const updateBoardList = async (req: AppRequest<TaskList[]>, res: Response) => {
  try {
    req.taskBoard.lists = req.body;
    await req.taskBoard.save();
    // populate lists and tasks if needed
    await req.taskBoard.populate("lists.tasks");

    return res.status(200).json(req.taskBoard.lists).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
