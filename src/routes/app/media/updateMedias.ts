// import { AppRequest } from "@app/request";
// import { useGenericErrors } from "@authUtils/useGenericErrors";
// import { NextFunction, Response } from "express";

// export const updateMedias = async (req: AppRequest, res: Response, next: NextFunction) => {
//   try {
//     // const payload = formatFormData(req.body);
//     if (payload) {
//       const { pageData, refs } = payload;
//       req.myApp.media.title = pageData.title;
//       req.myApp.media.subtitle = pageData.subtitle;
//       req.myApp.media.hasMedias = pageData.hasMedias;
//       req.myApp.media.hero = req.asset || "";
//       if (refs.hasMedias) req.myApp.media.medias = refs.hasMedias;
//       await req.myApp.save();
//     }
//     next();
//   } catch (error) {
//     useGenericErrors(res, error, "errror occured updating medias");
//   }
// };
