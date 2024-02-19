import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";
import { AuthRequest } from "@app/request";
import { getUserAuthWithUsername } from "@db/models/users/getUser";

export const validateUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const username = req.body.username || req.params.username;
  // must have a value
  if (!username) {
    return res.status(400).json(message.missingCredentials).end();
  }
  const user = await getUserAuthWithUsername({ username });
  if (user) req.user = user;
  next();
};
