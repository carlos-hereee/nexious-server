import { getApp } from "@dbModels/app/getApp.js";
import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import type { RequestHandler } from "express";

export const getOwnedApps: RequestHandler = async (req, res) => {
  try {
    if (req.user) {
      // send owned apps
      const apps = await getApp({ ownerId: req.user._id });
      res.status(202).json(apps).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to get ownedApps");
  }
};
