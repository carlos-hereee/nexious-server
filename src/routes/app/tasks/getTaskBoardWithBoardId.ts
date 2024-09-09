import { AppRequest } from "@app/request";
import { Response } from "express";

export const getTaskBoardWithBoardId = async (req: AppRequest, res: Response) => {
  await req.taskBoard.populate("lists.tasks", { options: { strictPopulate: false } });
  return res.status(200).json(req.taskBoard).end();
};
