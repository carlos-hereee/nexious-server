import { useGenericErrors } from "@authUtils/useGenericErrors.js";
import { createApp } from "@dbModels/app/createApp.js";
// import formatThemeList  from "@authUtils/app/format/formatThemeList";
// import formatLanguageList  from "@authUtils/app/format/formatLanguageList";
import themeList from "@data/app/themeList.json" assert { type: "json" };
import type { RequestHandler } from "express";

export const initApp: RequestHandler = async (req, res, next) => {
  try {
    if (req.user) {
      // key variables
      const appName = req.body.appName;
      const owner = req.user._id;
      const appUrl = "app/" + appName.split(" ").join("+");
      const logo = req.asset || "";
      // const logo = { url: req.asset, alt: appName + " industry brand", link: appUrl };
      const adminIds = [{ userId: owner, role: "owner" }];
      // const themeLis
      const app = await createApp({ appName, logo, owner, adminIds, themeList, appUrl });
      // add user permissions
      req.myApp = app;
      req.user.ownedApps.push(app._id);
      req.user.permissions.push({ appId: app._id, role: "owner" });
      await req.user.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
