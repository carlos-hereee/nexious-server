import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { AppNameParams } from "@app/express";

export const getAppWithName: AppNameParams = async (req, res) => {
  try {
    const appName = req.params.appName.split("+").join(" ");
    const app = await getApp({ appName });
    res.status(200).json({ app }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured getting app name");
  }
};
