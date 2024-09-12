import { AppRequest } from "@app/request";
import { getTaskWithId } from "@db/models/app/getTaskBoard";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const assignMemberToTask = async (req: AppRequest<{ status: string }>, res: Response, next: NextFunction) => {
  try {
    // find task
    const task = await getTaskWithId({ taskId: req.params.taskId });
    if (!task) return res.status(404).end();
    // if both are found
    if (req.body.status === "remove") {
      task.assignedTo = task?.assignedTo?.filter((m) => m.userId !== req.params.userId);
    }
    if (req.body.status === "assign") {
      // find member
      const member = req.taskBoard.members.filter((m) => m.userId === req.params.userId);
      // add to task
      if (member[0]) task.assignedTo?.push(member[0]);
    }
    await task.save();
    await req.taskBoard.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
