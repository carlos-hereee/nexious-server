import { useGenericErrors } from "@authUtils/useGenericErrors";
import { getPage } from "@dbModels/page/getPages";
import messages from "@data/error.message.json";
import { NextFunction, Request, Response } from "express";

export const requirePage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // if(req.p)
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
