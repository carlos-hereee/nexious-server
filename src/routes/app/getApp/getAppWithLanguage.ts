import type { AppRequest } from "@app/request";
import { getApp } from "@db/models/app/getApp";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const getAppWithLanguage = async (req: AppRequest, res: Response) => {
  try {
    const { appId, locale } = req.params;
    const app = await getApp({ appId, locale });
    return res.status(200).json({ app }).end();
  } catch (error) {
    return useGenericErrors(res, error, "error occured fetching new language");
  }
};
