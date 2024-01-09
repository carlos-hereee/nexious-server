import type { MiddlewareProps } from "@app/db";
import message from "@data/error.message.json";

export const requireApp: MiddlewareProps = (req, res, next) => {
  req.apps ? next() : res.status(404).json(message.appNotFound);
};
