import message from "@data/error.message.json" ;
import type { RequestHandler } from "express";

export const requireApp: RequestHandler = (req, res, next) => {
  req.myApp ? next() : res.status(404).json(message.appNotFound);
};
