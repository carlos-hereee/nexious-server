import type { MiddlewareProps } from "@app/db";
import type { ISection } from "@app/page";
import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateLandingPage: MiddlewareProps = async (req, res, next) => {
  try {
    let { pageData, refs } = formatFormData(req.body);

    // update landing
    req.app.landing.title = pageData.title;
    req.app.landing.tagline = pageData.tagline;
    req.app.landing.body = pageData.body;
    req.app.landing.hasCta = pageData.hasCta;
    req.app.landing.hasSections = pageData.hasSections;
    if (refs.hasCta) req.app.landing.cta = refs.hasCta;
    if (req.assets) {
      // update asset data
      if (req.assets.hero) req.app.landing.hero = req.assets.hero;
      if (refs.hasSections) {
        if (req.assets.sectionHero.length > 0 && refs.hasSections?.length > 0) {
          // TODO:  match asset data to section data
          if (req.assets.sectionHero.length === refs.hasSections.length) {
            const sections: ISection[] = [];
            for (let item = 0; item < refs.hasSections.length; item++) {
              const element = refs.hasSections[item];
              sections.push({ ...element, sectionHero: req.assets.sectionHero[item] });
            }
            req.app.landing.sections = sections;
          }
        }
      }
    }
    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
