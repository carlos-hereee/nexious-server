import message from "@db/data/error.message.json";
import { generateHash } from "@utils/auth/generateHash";
import { NextFunction, Response } from "express";
import { AuthRequest } from "@app/request";

export const authenticatePassword = (req: AuthRequest, res: Response, next: NextFunction) => {
  // if (!req.auth) return res.status(403).json(message.unauthorizedUser).end();
  // key variable
  const password = req.body.password || req.body.oldPassword;
  // use previous salt with password regenerate hash password
  const expectedHash = generateHash(req.auth.salt, password);
  // validate password
  if (expectedHash !== req.auth.password) return res.status(403).json(message.unauthorizedUser).end();
  next();
};
