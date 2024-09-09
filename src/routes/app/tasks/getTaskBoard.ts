import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getTaskBoard = async (req: AppRequest, res: Response) => {
  try {
    if (!req.project.taskBoard) return res.status(404).json("unable to find taskboard").end();
    await req.project.populate("taskBoard taskBoard.lists.tasks");
    console.log("req.project.taskBoard :>> ", req.project.taskBoard);
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

// export const getTaskBoardWithId = async (req: AppRequest, res: Response) => {
//   try {
//     if (!req.project.taskBoard) return res.status(404).json("unable to find taskboard").end();
//     await req.project.populate("taskBoard");
//     return res.status(200).json(req.project.taskBoard).end();
//   } catch (error) {
//     useGenericErrors(res, error, "error registering user");
//   }
// };
