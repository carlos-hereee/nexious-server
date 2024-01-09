import getStore from "@dbModels/store/getStore";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const getStoreWithAppId: MiddlewareProps = (req, res, next) => {
  try {
    req.store = await getStore({ appId: req.apps.appId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
