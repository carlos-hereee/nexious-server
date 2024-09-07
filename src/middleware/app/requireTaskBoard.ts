import { AppRequest } from "@app/request";
import { getTaskBoard } from "@db/models/app/getTaskBoard";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const requireTaskBoard = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const board = await getTaskBoard({ boardId: req.params.boardId });
    if (!board) return res.status(404).json("unable to find task board").end();
    req.taskBoard = board;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
