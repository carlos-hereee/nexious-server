// import type { ISection } from "@app/page";
// import { AppRequest } from "@app/request";
// // import { formatFormData }  from "@utils/app/format/formatFormData";
// import { useGenericErrors }  from "@utils/auth/useGenericErrors";
// import { NextFunction, Response } from "express";

// export const updateLandingPage = async (req: AppRequest, res: Response, next: NextFunction) => {
//   try {
//     let { pageData, refs } = formatFormData(req.body);
//     // update landing
//     req.project.landing.title = pageData.title;
//     req.project.landing.tagline = pageData.tagline;
//     req.project.landing.body = pageData.body;
//     req.project.landing.hasCta = pageData.hasCta;
//     req.project.landing.hasSections = pageData.hasSections;
//     if (refs.hasCta) req.project.landing.cta = refs.hasCta;
//     if (req.assets) {
//       // update asset data
//       if (req.assets.hero) req.project.landing.hero = req.assets.hero;
//       if (refs.hasSections) {
//         if (req.assets.sectionHero.length > 0 && refs.hasSections?.length > 0) {
//           // TODO:  match asset data to section data
//           if (req.assets.sectionHero.length === refs.hasSections.length) {
//             const sections: ISection[] = [];
//             for (let item = 0; item < refs.hasSections.length; item++) {
//               const element = refs.hasSections[item];
//               if (element && typeof req.assets.sectionHero[item] === "string") {
//                 sections.push({ ...element, sectionHero: req.assets.sectionHero[item] || "" });
//               }
//             }
//             req.project.landing.sections = sections;
//           }
//         }
//       }
//     }
//     await req.project.save();
//     next();
//   } catch (error) {
//     useGenericErrors(res, error, "error occured updating lading page");
//   }
// };
