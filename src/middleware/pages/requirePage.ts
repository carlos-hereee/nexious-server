import { useGenericErrors } from "../../utils/auth/useGenericErrors";
import getPages from "@dbModels/page/getPages";
import messages from "@data/error.message.json";

export const requirePage = (req, res, next) => {
  try {
    const pageId = req.params.pageId;
    if (pageId) {
      req.page = await getPages({ pageId });
      next();
    } else res.status(404).json(messages.pageNotFound).end();
  } catch (error) {
    useGenericErrors(res, error, "unable to find page");
  }
};
