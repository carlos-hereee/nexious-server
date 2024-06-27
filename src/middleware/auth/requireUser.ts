import { AuthRequest } from "@app/request";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const requireUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  // check if user was found  otherwise end progress
  return req.user ? next() : res.status(400).json(message.userNotFound).end();
};

export const requireUniqueUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  // user must be null else name is taken
  return req.user ? res.status(403).json(message.userAlreadyExist).end() : next();
};
