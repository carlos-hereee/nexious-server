import { AppRequest } from "@app/request";
import { Response } from "express";

export const getTaskBoardWithBoardId = (req: AppRequest, res: Response) => {
  return res.status(200).json(req.taskBoard).end();
};
