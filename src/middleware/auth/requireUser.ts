import { AuthRequest } from "@app/request";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const requireUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  // check if user was found
  if (req.user) next();
  // otherwise end progress
  else res.status(404).json(message.userNotFound).end();
};
