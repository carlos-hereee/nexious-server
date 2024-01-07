import { getApp } from "@dbModels/app/getApp";
import { getStore } from "@dbModels/store/getStore";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { RouterProps } from "@app/app";
// import type { IAppSchema } from "@app/db";

export const getStoreWithName: RouterProps = async (req, res) => {
  try {
    const { appName } = req.params;
    // const payload = {} as IAppSchema;
    const app = await getApp({ appName });
    console.log("app :>> ", app);
    // if (app) payload.app = app;
    if (app && app.store) {
      const store = await getStore({ storeId: app.store.storeId });
      res.status(200).json(store).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "unable to get store data");
  }
};
