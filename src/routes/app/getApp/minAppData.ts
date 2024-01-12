import { getApp } from "@dbModels/app/getApp";
import { getUser } from "@dbModels/users/getUser";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { MinAppDataRequest } from "@app/express";

export const minAppData: MinAppDataRequest = async (req, res) => {
  try {
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
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
