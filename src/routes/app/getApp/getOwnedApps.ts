import { getAllApps } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { AdminRequest } from "@app/request";

export const getOwnedApps = async (req: AdminRequest, res: Response) => {
  try {
    // send owned apps
    const apps = await getAllApps({ ownerId: req.user._id });
    res.status(202).json(apps).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get ownedApps");
  }
};
