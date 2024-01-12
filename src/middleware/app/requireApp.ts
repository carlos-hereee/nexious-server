import type { MiddlewareProps } from "@app/express";
import message from "@data/error.message.json";

export const requireApp: MiddlewareProps = (req, res, next) => {
  req.myApp ? next() : res.status(404).json(message.appNotFound);
};
