import { AppRequest } from "@app/request";
import { getApp } from "@db/models/app/getApp";
import BoardTasks from "@db/schema/boardTasts";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

// export const getTaskBoard = async (req: AppRequest, res: Response) => {
//   try {
//     console.log("\n\nreq.body ==>", req.body, "\n\n");
//     console.log("\n\nreq.params ==>", req.params, "\n\n");
//     // if (!req.project.taskBoard) return res.status(404).json("unable to find taskboard").end();
//     // await req.project.populate({ path: "taskBoard taskBoard.lists.tasks", strictPopulate: false });
//     return res.status(200).json(req.project.taskBoard).end();
//   } catch (error) {
//     useGenericErrors(res, error, "getTaskBoard");
//   }
// };

export const getAllTaskBoard = async (req: AppRequest, res: Response) => {
  try {
    // if(!req.project) return res.status(404).json("unable to find requested project's taskboard").end()
    if (!req.project.taskBoards) return res.status(404).json("unable to find taskboard").end();
    await req.project.populate({ path: "taskBoards", strictPopulate: false });
    return res.status(200).json(req.project.taskBoards).end();
  } catch (error) {
    useGenericErrors(res, error, "  getAllTaskBoard");
  }
};
export const getAllAppTaskBoard = async (req: AppRequest, res: Response) => {
  try {
    const boards = await getApp({ appId: req.params.appId });
    if (!boards || !boards.taskBoard) return res.status(404).end();

    await boards.populate({ path: "taskBoards", strictPopulate: false });
    return res.status(200).json(boards.taskBoards).end();
  } catch (error) {
    useGenericErrors(res, error, "at getAllAppTaskboard ");
  }
};
export const getAllUserTaskBoard = async (req: AppRequest, res: Response) => {
  try {
    const boards = await BoardTasks.find({ "members.userId": req.params.userId });
    // error handling for no boards found
    if (!boards || boards.length === 0) return res.status(404).end();
    // success
    return res.status(200).json(boards).end();
  } catch (error) {
    useGenericErrors(res, error, "at getAllAppTaskboard ");
  }
};
