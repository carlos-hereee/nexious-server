import { AppRequest } from "@app/request";
import BoardTasks from "@db/schema/boardTasts";
import { generateBoardList } from "@utils/app/generateBoardList";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import { v4 } from "uuid";

interface B {
  name: string;
  description: string;
}
export const buildBoard = async (req: AppRequest<B>, res: Response, next: NextFunction) => {
  try {
    // generate board link
    const boardId = v4();
    const boardLink = `/task-board${req.project.appLink}/${boardId}`;
    // generate starter list
    const lists = generateBoardList();
    // create board
    const taskBoard = await BoardTasks.create({ ...req.body, ownerId: req.user.userId, boardId, boardLink, lists });
    if (!taskBoard) return res.status(500).json("unable to build task board").end();
    // link board to app
    if (!req.project.taskBoard) req.project.taskBoard = taskBoard._id;
    req.project.taskBoards.push(taskBoard._id);
    // save to db
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
