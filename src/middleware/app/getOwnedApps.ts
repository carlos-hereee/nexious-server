// import { getApp } from "@dbModels/app/getApp";
// import type { UserRequestware } from "@app/express";
// import { useGenericErrors } from "@authUtils/useGenericErrors";

// export const getOwnedApps: UserRequestware = async (req, res, next) => {
//   try {
//     const appIds = req.user.ownedApps;
//     const apps = await getApp({ appIds });
//     if (apps) req.myApp = apps;
//     next();
//   } catch (error) {
//     useGenericErrors(res, error, "unable to get owned apps");
//   }
// };
