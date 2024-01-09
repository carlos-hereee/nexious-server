import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { MiddlewareProps } from "@app/db";

export const getAppWithAppId: MiddlewareProps = async (req, res, next) => {
  try {
    const app = await getApp({ appId: req.params.appId });
    // if (app) req.apps = { ...req.apps, ...app };
    if (app) req.apps = app;
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
