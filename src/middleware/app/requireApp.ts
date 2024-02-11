import { AppRequest } from "@app/request";
import message from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const requireApp = (req: AppRequest<null>, res: Response, next: NextFunction) => {
  req.myApp ? next() : res.status(404).json(message.appNotFound);
};
