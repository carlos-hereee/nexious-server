import type { AppRequest } from "@app/request";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const requirePage = (req: AppRequest, res: Response, next: NextFunction) => {
  req.page ? next() : res.status(404).json(message.pageNotFound).end();
};
