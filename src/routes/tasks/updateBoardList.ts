import { AppRequest } from "@app/request";
import { TaskList } from "@app/tasks";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateBoardList = async (req: AppRequest<TaskList[]>, res: Response, next: NextFunction) => {
  try {
    req.taskBoard.lists = req.body;
    await req.taskBoard.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
