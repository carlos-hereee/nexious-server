import { getApp } from "@dbModels/app/getApp";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { RequestHandler } from "express";

export const getAppWithName: RequestHandler = async (req, res) => {
  try {
    if (req.params.appName) {
      const appName = req.params.appName.split("+").join(" ");
      const app = await getApp({ appName });
      res.status(200).json({ app }).end();
    }
  } catch (error) {
    useGenericErrors(res, error, "error occured getting app name");
  }
};
