import type { IPage, ISection } from "@app/page";
import { AppRequest } from "@app/request";
import { formatFormData } from "@utils/app/format/formatFormData";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updatePage = async (req: AppRequest<IPage>, res: Response, next: NextFunction) => {
  try {
    const page = formatFormData(req.body);
    // update page data
    if (req.body.title) req.page.title = req.body.title;
    if (req.body.body) req.page.body = req.body.body;
    if (req.body.hasCta) req.page.hasCta = req.body.hasCta === "true";
    if (req.body.hasSections) req.page.hasSections = req.body.hasSections === "true";
    // if update contains CTA
    if (page.hasCta) req.page.cta = page.hasCta;
    // if assets contains hero
    if (req.assets.hero) req.page.hero = req.assets.hero;
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
          req.page.sections = sections;
        }
      }
    }
    await req.page.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
