import { removePage } from "@dbModels/page/removePage";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import type { MiddlewareProps } from "@app/db";

export const deletePage: MiddlewareProps = async (req, res, next) => {
  try {
    const { appId, pageId } = req.params;
    // find page
    const pageIdx = req.apps.pages.findIndex((page) => page.pageId === pageId);
    // remove page from app pages
    req.apps.pages = req.apps.pages.filter((page) => page.pageId !== pageId);
    // remove page from menu if found
    const pageName = req.apps.pages[pageIdx].name;
    if (pageName) req.apps.menu = req.apps.menu.filter((m) => m.name !== pageName);

    await req.apps.save();
    // finally remove page
    await removePage({ appId, pageId });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to delete page");
  }
};
