import { AuthRequest } from "@app/request";
import message from "@db/data/error.message.json";
import { getUser } from "@db/models/users/getUser";
import { NextFunction, Response } from "express";

export const requireUsername = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const username = req.body.username || req.params.username;
  // require key variable
  if (!username) {
    return res.status(400).json(message.missingCredentials).end();
  }
  if (!req.user) {
    const user = await getUser({ username });
    if (user) req.user = user;
  }
  next();
};
