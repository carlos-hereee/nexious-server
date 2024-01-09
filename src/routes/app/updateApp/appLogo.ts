import type { MiddlewareProps } from "@app/db";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateAppLogo: MiddlewareProps = async (req, res, next) => {
  try {
    // // update appname
    // req.apps.appName = req.body.appName;
    // req.asset middleware yields asset url
    req.apps.logo = req.asset;
    await req.apps.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occurred updating app resources");
  }
};
