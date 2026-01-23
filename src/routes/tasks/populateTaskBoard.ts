import { AppRequest } from "@app/request";
import { Response } from "express";

export const populateTaskBoard = async (req: AppRequest, res: Response) => {
  await req.taskBoard.populate({
    path: "lists.tasks calendarEvents notifications",
    populate: {
      path: "comments pinnedComment",
      populate: "comments.replies pinnedComment.replies",
      options: { strictPopulate: false },
    },
    options: { strictPopulate: false },
  });
  return res.status(200).json(req.taskBoard).end();
};
