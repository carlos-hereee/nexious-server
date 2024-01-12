import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { MiddlewareProps } from "@app/express";

export const getAppWithAppId: MiddlewareProps = async (req, res, next) => {
  try {
    const app = await getApp({ appId: req.params.appId });
    // if (app) req.myApp = { ...req.myApp, ...app };
    if (app) req.myApp = app;
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
