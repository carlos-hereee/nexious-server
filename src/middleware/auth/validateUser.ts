import { getUserAuth } from "@dbModels/users/getUserAuth.js";
import message from "@data/error.message.json" assert { type: "json" };
import type { RequestHandler } from "express";

export const validateUser: RequestHandler = async (req, res, next) => {
  const username = req.body.username || req.params.username;
  // must have a value
  if (!username) {
    return res.status(400).json(message.missingCredentials).end();
  }
  req.user = await getUserAuth({ username });
  next();
};
