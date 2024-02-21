import { AppRequest } from "@app/request";
import messages from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const validateAdmin = (req: AppRequest, res: Response, next: NextFunction) => {
  // find matching ids
  const isMatch = req.project.adminIds.some((data) => data.userId === req.user._id);
  isMatch ? next() : res.status(400).json(messages.unauthorizedUser);
};
