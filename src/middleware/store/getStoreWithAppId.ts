import getStore from "@dbModels/store/getStore";
import { useGenericErrors } from "../../utils/auth/useGenericErrors";

export const getStoreWithAppId = (req, res, next) => {
  try {
    req.store = await getStore({ appId: req.app.appId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting store");
  }
};
