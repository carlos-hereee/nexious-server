import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

interface B {
  name: string;
  description: string;
}
export const updateBoard = async (req: AppRequest<B>, res: Response) => {
  try {
    const board = req.taskBoard;
    const { boardId } = req.params;

    // update changes if any
    if (board.name !== req.body.name) {
      // generate new board link
      const boardLink = `/task-board/${boardId}`;
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
