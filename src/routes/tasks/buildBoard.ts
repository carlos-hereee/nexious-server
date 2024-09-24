import { AppRequest } from "@app/request";
import BoardTasks from "@db/schema/boardTasts";
import { generateBoardList } from "@utils/app/generateBoardList";
import { generateUsername } from "@utils/app/generateStr";
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
    const boardLink = req.project ? `/task-board${req.project.appLink}/${boardId}` : `/dashboard/task-board/${boardId}`;
    // user data
    const { avatar, userId } = req.user;
    const name = generateUsername(req.user);
    const members = [{ name, userId, avatar, role: "owner" }];
    // generate starter list
    const lists = generateBoardList();
    // create board
    const taskBoard = await BoardTasks.create({ ...req.body, ownerId: req.user.userId, boardId, boardLink, lists, members });
    if (!taskBoard) return res.status(500).json("unable to build task board").end();
    req.taskBoard = taskBoard;
    // link to user
    req.user.boards?.push({ uid: boardId, boardId: taskBoard._id, role: "owner", name: taskBoard.name });
    await req.user.save();
    // link board to app
    if (req.project) {
      if (!req.project.taskBoard) req.project.taskBoard = taskBoard._id;
      req.project.taskBoards.push(taskBoard._id);
      await req.project.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
