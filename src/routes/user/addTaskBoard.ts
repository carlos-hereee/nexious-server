import { UserRequest } from "@app/request";
import BoardTasks from "@db/schema/boardTasts";
import { generateBoardList } from "@utils/app/generateBoardList";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { v4 } from "uuid";

interface B {
  name: string;
  description: string;
}
export const addTaskBoard = async (req: UserRequest<B>, res: Response) => {
  try {
    // generate board link
    const boardId = v4();
    const boardLink = `/dashboard/task-board/${boardId}`;
    // generate starter list
    const lists = generateBoardList();
    const taskBoard = await BoardTasks.create({ ...req.body, ownerId: req.user.userId, boardId, boardLink, lists });
    if (!taskBoard) return res.status(500).json("unable to build task board").end();
    // link to user
    req.user.boards?.push({ uid: boardId, boardId: taskBoard._id, role: "owner", name: taskBoard.name });
    // save to db
    await req.user.save();
    return res.status(200).json(req.user).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
