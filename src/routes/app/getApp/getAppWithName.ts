import { getApp } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Request, Response } from "express";

export const getAppWithName = async (req: Request, res: Response) => {
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
