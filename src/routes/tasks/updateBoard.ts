import { AppRequest } from "@app/request";
import { getTaskBoard } from "@db/models/app/getTaskBoard";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
// import { IBoards } from "@app/tasks";

interface B {
  name: string;
  description: string;
}
export const updateBoard = async (req: AppRequest<B>, res: Response) => {
  try {
    const { boardId } = req.params;
    const board = await getTaskBoard({ boardId });
    if (!board) return res.status(404).json("task board not found").end();

    // update changes if any
    if (board.name !== req.body.name) {
      // generate new board link
      const boardLink = req.project ? `/task-board${req.project.appLink}/${boardId}` : `/dashboard/task-board/${boardId}`;
      board.name = req.body.name;
      board.boardLink = boardLink;
    }
    if (board.description !== req.body.description) board.description = req.body.description;
    // save to db
    await board.save();

    return res.status(200).json(board).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
