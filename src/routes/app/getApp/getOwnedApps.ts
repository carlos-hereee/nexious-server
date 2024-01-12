import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { UserRequestware } from "@app/express";

export const getOwnedApps: UserRequestware = async (req, res) => {
  try {
    // send owned apps
    const apps = await getApp({ ownerId: req.user._id });
    res.status(202).json(apps).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to get ownedApps");
  }
};
