import { getApp } from "@dbModels/app/getApp";
import { getUser } from "@dbModels/users/getUser";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const minAppData: RequestHandler = async (req, res) => {
  try {
    if (req.user && req.myApp) {
      // key varialbles
      const userId = req.user.userId;
      const appName = req.myApp.appName;

      const appList = await getApp({ all: true });
      const user = await getUser({ userId });
      const app = await getApp({ appName });
      // const store = await getStore({ storeId: app.store.storeId });
      // if(app.store.storeId)
      // console.log("app :>> ", store);
      res.status(200).json({ user, app, appList }).end();
      // res.status(200).json({ user, app, appList, store }).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
