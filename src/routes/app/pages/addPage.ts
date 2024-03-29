import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { IPage, IPageSchema, ISection } from "@app/page";
import { NextFunction, Response } from "express";
import { AppRequest } from "@app/request";
import { formatFormData } from "@utils/app/format/formatFormData";
import Page from "@db/schema/page";
import { formatMenuPageData } from "@utils/app/format/formatMenuPageData";

export const addPage = async (req: AppRequest<IPage>, res: Response, next: NextFunction) => {
  try {
    const pageName = req.body.name;
    const page = formatFormData(req.body);
    // if section heros were uploaded
    if (req.assets.sectionHero) {
      if (req.assets.sectionHero.length > 0 && page.hasSections.length > 0) {
        // TODO: match asset data to section data
        if (req.assets.sectionHero.length === page.hasSections.length) {
          const sections: ISection[] = [];
          for (let item = 0; item < page.hasSections.length; item++) {
            const element = page.hasSections[item];
            if (element && typeof req.assets.sectionHero[item] === "string") {
              sections.push({ ...element, sectionHero: req.assets.sectionHero[item] || "" });
            }
          }
          page.hasSections = sections;
        }
      }
    }
    // add page data
    const pageData: IPageSchema = await Page.create({
      type: "page",
      title: req.body.title,
      name: pageName,
      body: req.body.body,
      hasCta: req.body.hasCta === "true",
      hasSections: req.body.hasSections === "true",
      hero: req.assets.hero || "",
      cta: page.hasCta,
      sections: page.hasSections,
    });
    const menuItem = formatMenuPageData(pageName);
    // link page to app menu
    req.project.menu.push({ ...menuItem, menuId: pageData.pageId });
    await req.project.save();

    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to add page ");
  }
};
