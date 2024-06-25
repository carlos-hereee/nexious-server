import { AppRequest } from "types/request";
import { removePage } from "@db/models/page/removePage";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const deletePage = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // key varibles
    const id = req.page._id;
    const name = req.page.name;
    const pageId = req.page.pageId;
    // const { appId, pageId } = req.params;
    // if page exist remove it ;
    if (id && req.project.pages.includes(id)) {
      //  remove page from app pages
      req.project.pages = req.project.pages.filter((p) => p.valueOf() !== id.valueOf());
    }
    // // remove page from menu if found
    if (name && req.project.menu.some((m) => m.value === name)) {
      // remove page link from app menu
      req.project.menu = req.project.menu.filter((m) => m.value !== name);
    }
    // // finally remove page
    if (pageId) await removePage({ appId: req.project.appId, pageId });
    // save changes
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to delete page");
  }
};
