import type { IPage, ISection } from "@app/page";
import { AppRequest } from "@app/request";
import { formatFormData } from "@utils/app/format/formatFormData";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

// eslint-disable-next-line @typescript-eslint/require-await
export const updateLandingPage = async (req: AppRequest<IPage>, res: Response, next: NextFunction) => {
  try {
    const page = formatFormData(req.body);
    // update landing
    req.page.title = req.body.title;
    req.page.tagline = req.body.tagline;
    req.page.body = req.body.body;
    req.page.hasCta = req.body.hasCta === "true";
    req.page.hasSections = req.body.hasSections === "true";
    // page contains CTA
    if (req.page.hasCta) req.page.cta = page.hasCta;
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
