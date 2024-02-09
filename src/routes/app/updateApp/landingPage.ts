import type { ISection } from "@app/page";
import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateLandingPage: RequestHandler = async (req, res, next) => {
  try {
    if (req.myApp) {
      let { pageData, refs } = formatFormData(req.body);

      // update landing
      req.myApp.landing.title = pageData.title;
      req.myApp.landing.tagline = pageData.tagline;
      req.myApp.landing.body = pageData.body;
      req.myApp.landing.hasCta = pageData.hasCta;
      req.myApp.landing.hasSections = pageData.hasSections;
      if (refs.hasCta) req.myApp.landing.cta = refs.hasCta;
      if (req.assets) {
        // update asset data
        if (req.assets.hero) req.myApp.landing.hero = req.assets.hero;
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
              req.myApp.landing.sections = sections;
            }
          }
        }
      }
      await req.myApp.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
