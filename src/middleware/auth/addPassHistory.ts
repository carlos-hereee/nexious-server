import { AuthRequest } from "@app/request";
import messages from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const addPassHistory = (req: AuthRequest, res: Response, next: NextFunction) => {
  // key variables
  const oldPassword = req.user.auth.password;
  // add password to the timeline
  if (!req.user.auth.passwordHistory.includes(oldPassword)) {
    req.user.auth.passwordHistory = [...req.user.auth.passwordHistory, oldPassword];
    next();
  } else res.status(400).json(messages.passwordAlreadyInHistory).end();
};
