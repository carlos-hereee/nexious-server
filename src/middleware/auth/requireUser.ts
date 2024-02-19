import { AuthRequest } from "@app/request";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const requireUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  // check if user was found  otherwise end progress
  return req.user ? next() : res.status(404).json(message.userNotFound).end();
};
