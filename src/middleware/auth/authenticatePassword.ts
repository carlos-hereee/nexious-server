import message from "@data/error.message.json";
import { generateHash } from "@authUtils/generateHash";
import { NextFunction, Response } from "express";
import { UserRequest } from "@app/request";

export const authenticatePassword = (req: UserRequest, res: Response, next: NextFunction) => {
  // key variable
  const password = req.body.password || req.body.oldPassword;
  if (req.user) {
    // use previous salt with password regenerate hash password
    const expectedHash = generateHash(req.user.auth.salt, password);
    // validate password
    if (expectedHash === req.user.auth.password) {
      next();
    }
  } else {
    res.status(403).json(message.invalidCredentails).end();
  }
};
