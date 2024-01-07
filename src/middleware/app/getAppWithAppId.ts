import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { MiddlewareProps } from "@app/db";

export const getAppWithAppId: MiddlewareProps = async (req, res, next) => {
  try {
    const { appId } = req.params;
    if (appId) req.app = await getApp({ appId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
