//
// import { useGenericErrors } from "@authUtils/useGenericErrors";

// export const updateAppName: RequestHandler= (req, res, next) => {
//   try {
//     const appName = req.body.appName || req.params.appName;
//     // update appname if they dont match
//     if (appName !== req.myApp.appName) req.myApp.appName = appName;
//     next();
//   } catch (error) {
//     useGenericErrors(res, error, "error updating logo and appname");
//   }
// };
