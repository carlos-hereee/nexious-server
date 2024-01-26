import type { RequestHandler } from "express";
import messages from "@data/error.message.json" assert { type: "json" };

export const validateAdmin: RequestHandler = (req, res, next) => {
  if (req.user) {
    // const appId = req.params.appId || req.body.appId;
    const appId = req.params.appId;
    // const isMatch = req.user.ownedApps.filter((data) => data.appId === appId);
    const isMatch = req.user.ownedApps.filter((data) => data === appId);
    isMatch ? next() : res.status(400).json(messages.unauthorizedUser);
  }
};
