import { AppRequest } from "@app/request";
import { getTaskBoard } from "@db/models/app/getTaskBoard";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getTaskBoardWithBoardId = async (req: AppRequest, res: Response) => {
  try {
    const board = await getTaskBoard({ boardId: req.params.boardId });
    if (!board) return res.status(404).json("unable to find task board").end();
    return res.status(200).json(board).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
