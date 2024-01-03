import { useGenericErrors } from "../../utils/auth/useGenericErrors";

export const updateAppName = (req, res, next) => {
  try {
    const appName = req.body.appName || req.params.appName;
    // update appname if they dont match
    if (appName !== req.app.appName) req.app.appName = appName;
    next();
  } catch (error) {
    useGenericErrors(res, error, "error updating logo and appname");
  }
};
