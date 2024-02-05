import type { RequestHandler } from "express";
import message from "@data/error.message.json" ;

export const requireUser: RequestHandler = (req, res, next) => {
  // check if user was found
  if (req.user) next();
  else {
    res.status(404).json(message.userNotFound).end();
  }
};
