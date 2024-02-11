import { getApp } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Request, Response } from "express";
export const getAppWithLanguage = async (req: Request, res: Response) => {
  try {
    const appName = req.params.appName;
    const locale = req.params.locale;
    const app = await getApp({ appName, locale });
    res.status(200).json({ app }).end();
  } catch (error) {
    useGenericErrors(res, error, "error occured fetching new language");
  }
};
