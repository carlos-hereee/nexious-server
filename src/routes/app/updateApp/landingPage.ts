import formatFormData from "../../../utils/app/format/formatFormData";
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
    // update asset data
    if (req.asset.hero) req.app.landing.hero = req.asset.hero;

    if (req.asset.sectionHero.length > 0 && refs.hasSections?.length > 0) {
      // TODO:  match asset data to section data
      if (req.asset.sectionHero.length === refs.hasSections.length) {
        const sections = [];
        for (let item = 0; item < refs.hasSections.length; item++) {
          const element = refs.hasSections[item];
          sections.push({ ...element, sectionHero: req.asset.sectionHero[item] });
        }
        req.app.landing.sections = sections;
      }
    }

    await req.app.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updating lading page");
  }
};
