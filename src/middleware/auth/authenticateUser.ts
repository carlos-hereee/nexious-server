import type { RequestHandler } from "express";
import message from "@data/error.message.json";

export const authenticateUser: RequestHandler = (req, res, next) => {
  // user must be null else name is taken
  req.user ? res.status(403).json(message.userAlreadyExist).end() : next();
};
