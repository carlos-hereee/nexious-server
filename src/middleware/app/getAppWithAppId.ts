import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const getAppWithAppId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.params.appId) {
      req.myApp = await getApp({ appId: req.params.appId });
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to find app with app id ");
  }
};
