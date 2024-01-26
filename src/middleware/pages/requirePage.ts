import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { getPage } from "@dbModels/page/getPages.js";
import messages from "@data/error.message.json" assert { type: "json" };
import type { RequestHandler } from "express";

export const requirePage: RequestHandler = async (req, res, next) => {
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
