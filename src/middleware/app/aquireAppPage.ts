import type { AppRequest } from "@app/request";
import { getPage } from "@db/models/page/getPages";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const aquireAppPage = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const page = await getPage({ pageId: req.params.pageId });
    if (page) req.page = page;
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to get landing page data");
  }
};
