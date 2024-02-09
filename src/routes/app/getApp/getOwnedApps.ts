import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { Request, Response } from "express";

export const getOwnedApps = async (req: Request, res: Response) => {
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
