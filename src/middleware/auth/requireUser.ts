import type { MiddlewareProps } from "@app/express";
import message from "@data/error.message.json";
// import type { RequestHandler } from "express";

export const requireUser: MiddlewareProps = (req, res, next) => {
  // check if user was found
  if (req.user) next();
  else {
    res.status(404).json(message.userNotFound).end();
  }
};
