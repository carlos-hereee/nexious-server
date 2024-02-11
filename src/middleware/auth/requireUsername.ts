import { UserRequest } from "@app/request";
import message from "@data/error.message.json";
import { getUser } from "@dbModels/users/getUser";
import { NextFunction, Response } from "express";

export const requireUsername = async (req: UserRequest, res: Response, next: NextFunction) => {
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
