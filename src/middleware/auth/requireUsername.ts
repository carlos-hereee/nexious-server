import { AuthRequest } from "@app/request";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const requireUsername = (req: AuthRequest, res: Response, next: NextFunction) => {
  const username = req.body.username || req.params.username;
  // require key variable
  if (!username) {
    return res.status(400).json(message.missingCredentials).end();
  }
  next();
};
