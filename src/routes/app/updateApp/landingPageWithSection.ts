// // import updateHero from "@dbModels/hero/updateHero";
// import formatAssetData from "@appUtils/format/formatAssetData";
// import { formatFormData } from "@appUtils/format/formatFormData";
// // import updateApp from "@dbModels/app/updateApp";
// import { getApp } from "@dbModels/app/getApp";
// import type { RequestHandler } from "express";

// export const landingPageWithSection:RequestHandler= async (req, res) => {
//   const hero = req.file;
//   // format app landing page data
//   const formData = formatFormData(req.body);
//   const formatSectionHero = formatAssetData(hero, ...formData.sections);
//   const sectionHero = await updateHero(
//     { heroId: formatSectionHero.heroId },
//     { ...formatSectionHero }
//   );
//   // const ctaHero = await updateHero({ heroId: v4() }, ...formData.cta);
//   const appPayload = {
//     ...formData,
//     cta: ctaHero.upsertedId,
//     sections: sectionHero.upsertedId,
//   };
//   await updateApp({ appId: req.myApp.appId }, { landing: appPayload });
//   // finally send app data
//   const app = await getApp({ appId: req.myApp.appId });
//   res.status(200).json(app).end();
// };
