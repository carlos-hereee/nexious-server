// import { awsImageUrl } from "@config";
// import { formatFormData } from "@appUtils/format/formatFormData";
// // import { formatMenuPageData } from "@appUtils/format/formatMenuPageData";
// import { useGenericErrors } from "@authUtils/useGenericErrors";
// import { addFile } from "@aws/index";
// import { generateParamFile } from "@aws/awsParams";
// import { getPages } from "@dbModels/page/getPages";
//
// import type { ISection } from "@app/page";

// export const updatePage: RequestHandler = async (req, res, next) => {
//   try {
//     // get page data
//     const pageId = req.params.pageId;
//     const page = await getPages({ pageId });
//     if (page) {
//       let { pageData, refs } = formatFormData(req.body);
//       if (req.files) {
//         if (req.files.hero) {
//           const pageHero = req.files.hero[0];
//           const params = generateParamFile(pageHero);
//           await addFile(params);
//           if (params) pageData.hero = awsImageUrl + params.Key;
//         }
//         if (refs.hasSections) {
//           if (req.files.sectionHero) {
//             let sections: ISection[] = [];
//             for (let item = 0; item < refs.hasSections.length; item++) {
//               const sectionHero = req.files.sectionHero[item];
//               const current = refs.hasSections[item];
//               const params = generateParamFile(sectionHero);
//               if (params) {
//                 await addFile(params);

//                 sections.push({ ...current, sectionHero: awsImageUrl + params.Key });
//               }
//             }
//             pageData.sections = sections;
//           }
//         }
//       }
//       // TODO: TEST UPdateing page
//       // if (refs.hasCta) page.cta = refs.hasCta;
//       // // update page name on menu
//       // const pageName = pageData.name;
//       // const pageIdx = req.myApp.menu.findIndex((m) => m.isPage && m.name === pageName);
//       // if (pageIdx >= 0) {
//       //   const menuData = formatMenuPageData(pageName);
//       //   req.myApp.menu[pageIdx] = menuData;
//       //   await req.myApp.save();
//       // }

//       // await page.save();
//       next();
//     }
//   } catch (error) {
//     useGenericErrors(res, error, "unable to update page");
//   }
// };
