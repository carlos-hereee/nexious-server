import { useGenericErrors } from "@authUtils/useGenericErrors";
import { getPages } from "@dbModels/page/getPages";
import messages from "@data/error.message.json";
import type { MiddlewareProps } from "@app/db";

export const requirePage: MiddlewareProps = async (req, res, next) => {
  try {
    const pageId = req.params.pageId;
    const page = await getPages({ pageId });
    if (page) {
      req.page = page;
      next();
    } else res.status(404).json(messages.pageNotFound).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to find page");
  }
};
