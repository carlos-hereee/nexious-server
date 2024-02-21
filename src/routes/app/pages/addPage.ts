// import { awsImageUrl }  from "@utils/app/config";
// import { createPage } from "@db/models/page/createPage";
// import { formatMenuPageData }  from "@utils/app/format/formatMenuPageData";
// import { useGenericErrors }  from "@utils/auth/useGenericErrors";
// import { addFile }  from "@utils/aws/index";
// import { generateParamFile }  from "@utils/aws/awsParams";
// import type { ISection } from "@app/page";
// import { NextFunction, Response } from "express";
// import { AppRequest } from "@app/request";

// export const addPage = async (req: AppRequest, res: Response, next: NextFunction) => {
//   try {
//     let { pageData, refs } = formatFormData(req.body);
//     if (req.files) {
//       if (req.files.hero) {
//         const pageHero = req.files.hero[0];
//         const params = generateParamFile(pageHero);
//         if (params) {
//           await addFile(params);
//           pageData.hero = awsImageUrl + params.Key;
//         }
//       }
//       if (refs.hasSections) {
//         let sections: ISection[] = [];
//         for (let item = 0; item < refs.hasSections.length; item++) {
//           const sectionHero = req.files.sectionHero[item];
//           const current = refs.hasSections[item];
//           if (sectionHero && current) {
//             const params = generateParamFile(sectionHero);
//             if (params) {
//               await addFile(params);
//               sections.push({ ...current, sectionHero: awsImageUrl + params.Key });
//             }
//           }
//         }
//         pageData.sections = sections;
//       }
//     }
//     const page = await createPage(pageData);
//     const menuData = formatMenuPageData(page.name);

//     req.project.pages.push(page._id);
//     req.project.menu.push(menuData);
//     await req.project.save();
//     next();
//   } catch (error) {
//     useGenericErrors(res, error, "unable to add page ");
//   }
// };
