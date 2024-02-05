import message from "@data/error.message.json";
import { getUser } from "@dbModels/users/getUser";
import type { RequestHandler } from "express";

export const requireUsername: RequestHandler = async (req, res, next) => {
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
