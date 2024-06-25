import { AppRequest } from "types/request";
import messages from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const validateAdmin = (req: AppRequest, res: Response, next: NextFunction) => {
  // find matching ids
  const isMatch = req.project.adminIds.some((data) => data.userId === req.user.userId);
  isMatch ? next() : res.status(400).json(messages.unauthorizedUser);
};
