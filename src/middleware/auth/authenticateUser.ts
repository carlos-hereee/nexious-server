import type { MiddlewareProps } from "@app/express";
import msg from "@data/error.message.json";

export const authenticateUser: MiddlewareProps = (req, res, next) => {
  // user must be null else name is taken
  req.user ? res.status(403).json(msg.userAlreadyExist).end() : next();
};
