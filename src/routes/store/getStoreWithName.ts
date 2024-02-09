import { getApp } from "@dbModels/app/getApp";
// import { getStore } from "@dbModels/store/getStore";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { Request, Response } from "express";

// import type { IAppSchema } from "@app/db";

export const getStoreWithName = async (req: Request, res: Response) => {
  try {
    const { appName } = req.params;
    // const payload = {} as IAppSchema;
    const app = await getApp({ appName });
    console.log("app :>> ", app);
    // if (app) payload.app = app;
    // if (app && app.store) {
    //   const store = await getStore({ id: app.store });
    //   res.status(200).json(store).end();
    // }
  } catch (error) {
    useGenericErrors(res, error, "unable to get store data");
  }
};
