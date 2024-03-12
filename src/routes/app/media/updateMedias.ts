// import { AppRequest } from "@app/request";
// import { useGenericErrors }  from "@utils/auth/useGenericErrors";
// import { NextFunction, Response } from "express";

// export const updateMedias = async (req: AppRequest, res: Response, next: NextFunction) => {
//   try {
//     // const payload = formatFormData(req.body);
//     if (payload) {
//       const { pageData, refs } = payload;
//       req.project.media.title = pageData.title;
//       req.project.media.subtitle = pageData.subtitle;
//       req.project.media.hasMedias = pageData.hasMedias;
//       req.project.media.hero = req.asset || "";
//       if (refs.hasMedias) req.project.media.medias = refs.hasMedias;
//       await req.project.save();
//     }
//     next();
//   } catch (error) {
//     useGenericErrors(res, error, "errror occured updating medias");
//   }
// };
