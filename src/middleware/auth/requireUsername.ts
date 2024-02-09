import message from "@data/error.message.json";
import { getUser } from "@dbModels/users/getUser";
import { NextFunction, Request, Response } from "express";
export const requireUsername = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username || req.params.username;
  // must have a value
  if (!username) {
    return res.status(400).json(message.missingCredentials).end();
  }
  if (!req.user) {
    const user = await getUser({ username });
    if (user) req.user = user;
  }
  next();
};
