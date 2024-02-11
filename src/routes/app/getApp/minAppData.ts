import { getApp } from "@db/models/app/getApp";
import { getUser } from "@db/models/users/getUser";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import { AppRequest } from "@app/request";

export const minAppData = async (req: AppRequest, res: Response) => {
  try {
    // key varialbles
    const userId = req.user.userId;
    const appName = req.myApp.appName;

    // const appList = await getApp({ all: true });
    const user = await getUser({ userId });
    const app = await getApp({ appName });
    // const store = await getStore({ storeId: app.store.storeId });
    // if(app.store.storeId)
    // console.log("app :>> ", store);
    res.status(200).json({ user, app }).end();
    // res.status(200).json({ user, app, appList, store }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
