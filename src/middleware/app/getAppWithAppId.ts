import getApp from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const getAppWithAppId = (req, res, next) => {
  try {
    const { appId } = req.params;
    req.app = await getApp({ appId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
