import removePage from "../../../db/models/page/removePage";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { MiddlewareProps } from "@app/app";

export const deletePage: MiddlewareProps = async (req, res, next) => {
  try {
    const { appId, pageId } = req.params;
    // find page
    const pageIdx = req.app.pages.findIndex((page) => page.pageId === pageId);
    // remove page from app pages
    req.app.pages = req.app.pages.filter((page) => page.pageId !== pageId);
    // remove page from menu if found
    const pageName = req.app.pages[pageIdx].name;
    if (pageName) req.app.menu = req.app.menu.filter((m) => m.name !== pageName);

    await req.app.save();
    // finally remove page
    await removePage({ appId, pageId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to delete page");
  }
};
