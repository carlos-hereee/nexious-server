import type { MiddlewareProps } from "@app/db";
import message from "@data/error.message.json";

export const requireUser: MiddlewareProps = (req, res, next) => {
  // check if user was found
  if (req.user) next();
  else {
    res.status(404).json(message.userNotFound).end();
  }
};
