import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const deleteTaskFromList = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    console.log("req.params :>> ", req.params);
    console.log("req.taskBoard :>> ", req.taskBoard);
    console.log("task list :>> ", req.taskBoard.lists[0]?.tasks, "");
    console.log("isMatch task :>> ", req.taskBoard.lists[0]?.tasks[0]?.toString() === req.params.taskId);

    return;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
