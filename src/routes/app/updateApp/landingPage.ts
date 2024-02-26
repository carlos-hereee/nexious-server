import type { ISection } from "@app/page";
import { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateLandingPage = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    const { pageData, refs } = formatFormData(req.body);
    // update landing
    req.page.title = pageData.title;
    req.page.tagline = pageData.tagline;
    req.page.body = pageData.body;
    req.page.hasCta = pageData.hasCta;
    req.page.hasSections = pageData.hasSections;
    if (refs.hasCta) req.page.cta = refs.hasCta;
    if (req.assets) {
      // update asset data
      if (req.assets.hero) req.page.hero = req.assets.hero;
      if (refs.hasSections) {
        if (req.assets.sectionHero.length > 0 && refs.hasSections?.length > 0) {
          // TODO:  match asset data to section data
          if (req.assets.sectionHero.length === refs.hasSections.length) {
            const sections: ISection[] = [];
            for (let item = 0; item < refs.hasSections.length; item++) {
              const element = refs.hasSections[item];
              if (element && typeof req.assets.sectionHero[item] === "string") {
                sections.push({ ...element, sectionHero: req.assets.sectionHero[item] || "" });
              }
            }
            req.page.sections = sections;
          }
        }
      }
    }
    await req.page.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
