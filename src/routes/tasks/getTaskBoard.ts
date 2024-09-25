import { AppRequest } from "@app/request";
import { getApp } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getTaskBoard = async (req: AppRequest, res: Response) => {
  try {
    if (!req.project.taskBoard) return res.status(404).json("unable to find taskboard").end();
    await req.project.populate("taskBoard taskBoard.lists.tasks");
    return res.status(200).json(req.project.taskBoard).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};

export const getAllTaskBoard = async (req: AppRequest, res: Response) => {
  try {
    if (!req.project.taskBoards) return res.status(404).json("unable to find taskboard").end();
    await req.project.populate("taskBoards");
    return res.status(200).json(req.project.taskBoards).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};
export const getAllAppTaskBoard = async (req: AppRequest, res: Response) => {
  try {
    const boards = await getApp({ appId: req.params.appId });
    if (!boards) return res.status(404).end();
    await boards.populate("taskBoards");
    return res.status(200).json(boards.taskBoards).end();
  } catch (error) {
    useGenericErrors(res, error, "error registering user");
  }
};

// export const getTaskBoardWithId = async (req: AppRequest, res: Response) => {
//   try {
//     if (!req.project.taskBoard) return res.status(404).json("unable to find taskboard").end();
//     await req.project.populate("taskBoard");
//     return res.status(200).json(req.project.taskBoard).end();
//   } catch (error) {
//     useGenericErrors(res, error, "error registering user");
//   }
// };
