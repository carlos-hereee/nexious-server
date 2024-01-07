import { getApp } from "@dbModels/app/getApp";
import type { MiddlewareProps } from "@app/app";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const getOwnedApps: MiddlewareProps = async (req, res, next) => {
  try {
    const appIds = req.user.ownedApps;
    req.app = await getApp({ appIds });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to get owned apps");
  }
};
