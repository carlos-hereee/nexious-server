import { getUserAuth } from "@dbModels/users/getUserAuth";
import message from "@data/error.message.json";
import { NextFunction, Request, Response } from "express";

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username || req.params.username;
  // must have a value
  if (!username) {
    return res.status(400).json(message.missingCredentials).end();
  }
  req.user = await getUserAuth({ username });
  next();
};
