import type { MiddlewareProps } from "@app/db";
import type { ISection } from "@app/page";
import { formatFormData } from "@appUtils/format/formatFormData";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const updateLandingPage: MiddlewareProps = async (req, res, next) => {
  try {
    let { pageData, refs } = formatFormData(req.body);

    // update landing
    req.apps.landing.title = pageData.title;
    req.apps.landing.tagline = pageData.tagline;
    req.apps.landing.body = pageData.body;
    req.apps.landing.hasCta = pageData.hasCta;
    req.apps.landing.hasSections = pageData.hasSections;
    if (refs.hasCta) req.apps.landing.cta = refs.hasCta;
    if (req.assets) {
      // update asset data
      if (req.assets.hero) req.apps.landing.hero = req.assets.hero;
      if (refs.hasSections) {
        if (req.assets.sectionHero.length > 0 && refs.hasSections?.length > 0) {
          // TODO:  match asset data to section data
          if (req.assets.sectionHero.length === refs.hasSections.length) {
            const sections: ISection[] = [];
            for (let item = 0; item < refs.hasSections.length; item++) {
              const element = refs.hasSections[item];
              sections.push({ ...element, sectionHero: req.assets.sectionHero[item] });
            }
            req.apps.landing.sections = sections;
          }
        }
      }
    }
    await req.apps.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
