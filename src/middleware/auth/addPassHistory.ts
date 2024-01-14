import type { RequestHandler } from "express";
import messages from "@data/error.message.json";

export const addPassHistory: RequestHandler = (req, res, next) => {
  if (req.user) {
    // key variables
    const oldPassword = req.user.auth.password;
    // add password to the timeline
    if (!req.user.auth.passwordHistory.includes(oldPassword)) {
      req.user.auth.passwordHistory = [...req.user.auth.passwordHistory, oldPassword];
      next();
    } else res.status(400).json(messages.passwordAlreadyInHistory).end();
  }
};
