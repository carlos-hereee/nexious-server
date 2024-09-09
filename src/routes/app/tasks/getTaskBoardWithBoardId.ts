import { AppRequest } from "@app/request";
import { Response } from "express";

export const getTaskBoardWithBoardId = async (req: AppRequest, res: Response) => {
  await req.taskBoard.populate({ path: "lists.tasks" });
  return res.status(200).json(req.taskBoard).end();
};
