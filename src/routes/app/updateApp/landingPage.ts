import type { IPageB, IPageSchema, ISection } from "@app/page";
import type { AppRequest } from "@app/request";
import Page from "@db/schema/page";
import { formatFormData } from "@utils/app/format/formatFormData";
import { formatMenuPageData } from "@utils/app/format/formatMenuPageData";
import { generateStringUrl } from "@utils/app/generateUrl";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateLandingPage = async (req: AppRequest<IPageB>, res: Response, next: NextFunction) => {
  try {
    const page = formatFormData(req.body);
    // update landing
    if (req.body.title) req.page.title = req.body.title;
    if (req.body.tagline) req.page.tagline = req.body.tagline;
    if (req.body.body) req.page.body = req.body.body;
    if (req.body.hasCta) req.page.hasCta = req.body.hasCta === "true";
    if (req.body.hasSections) req.page.hasSections = req.body.hasSections === "true";
    // if update contains CTA
    if (page.hasCta) {
      // populate pages
      await req.project.populate("pages");
      // create init page for each cta
      page.hasCta.forEach(async (p) => {
        const pageName = p.link;
        const pageIdx = req.project.pages.findIndex((p) => (p as unknown as IPageSchema).name === pageName);
        // if page doesnt exist
        if (pageIdx <= 0) {
          const ctaPage: IPageSchema = await Page.create({ type: "page", name: pageName });
          // link page app pages if success
          if (ctaPage._id && ctaPage.pageId) {
            req.project.pages.push(ctaPage._id);
            // format page url
            const pageUrl = `${req.project.appUrl}/${generateStringUrl(pageName)}`;
            const menuItem = formatMenuPageData({ pageName, category: "page", menuId: ctaPage.pageId, link: pageUrl });
            // link page to app menu
            req.project.menu.push(menuItem);
          }
        }
      });
      // save cta page data to project db
      await req.project.save();
      req.page.cta = page.hasCta;
    }
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
