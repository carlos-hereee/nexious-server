import { UserRequest } from "@app/request";
import message from "@data/error.message.json";
import { NextFunction, Response } from "express";

export const authenticateUser = (req: UserRequest, res: Response, next: NextFunction) => {
  // user must be null else name is taken
  req.user ? res.status(403).json(message.userAlreadyExist).end() : next();
};
