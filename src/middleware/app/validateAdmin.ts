import { ObjectId } from "@app/db";
import { UserRequest } from "@app/request";
import messages from "@db/data/error.message.json";
import { NextFunction, Response } from "express";

export const validateAdmin = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user) {
    // const appId = req.params.appId || req.body.appId;
    const appId = req.params.appId as unknown as ObjectId;
    // const isMatch = req.user.ownedApps.filter((data) => data.appId === appId);
    const isMatch = req.user.ownedApps.filter((data) => data === appId);
    isMatch ? next() : res.status(400).json(messages.unauthorizedUser);
  }
};
