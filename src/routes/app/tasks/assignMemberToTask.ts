import { AppRequest } from "@app/request";
import { getTaskWithId } from "@db/models/app/getTaskBoard";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const assignMemberToTask = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // find member
    const member = req.taskBoard.members.filter((m) => m.userId === req.params.userId);
    // find task
    const task = await getTaskWithId({ taskId: req.params.taskId });
    // if both are found
    if (member[0] && task) {
      // add to task
      task.assignedTo?.push(member[0]);
      await task.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
