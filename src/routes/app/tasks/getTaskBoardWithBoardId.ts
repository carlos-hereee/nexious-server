import { AppRequest } from "@app/request";
import { Response } from "express";
import { postsPopulate } from "@db/data/app/dbPopulateData.json";

export const getTaskBoardWithBoardId = async (req: AppRequest, res: Response) => {
  await req.taskBoard.populate({
    path: "lists.tasks",
    populate: {
      path: "comments pinnedComment",
      populate: postsPopulate,
    },
    options: { strictPopulate: false },
  });
  return res.status(200).json(req.taskBoard).end();
};
