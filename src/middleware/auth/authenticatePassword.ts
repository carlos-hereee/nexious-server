import message from "@data/error.message.json";
import { generateHash } from "@authUtils/generateHash";
import type { RequestHandler } from "express";

export const authenticatePassword: RequestHandler = (req, res, next) => {
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
