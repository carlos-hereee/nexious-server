import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { getPage } from "@db/models/page/getPages";
import messages from "@db/data/error.message.json";
import { NextFunction, Response } from "express";
import { PageRequest } from "types/request";

export const requirePage = async (req: PageRequest, res: Response, next: NextFunction) => {
  try {
    const pageId = req.params.pageId;
    const page = await getPage({ pageId });
    if (page) {
      req.page = page;
      next();
    } else res.status(404).json(messages.pageNotFound).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to find page");
  }
};
