import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { createApp } from "@db/models/app/createApp";
// import formatThemeList   from "@utils/auth/app/format/formatThemeList";
// import formatLanguageList   from "@utils/auth/app/format/formatLanguageList";
import themeList from "@db/data/app/themeList.json";
import { NextFunction, Response } from "express";
import { AppRequest } from "@app/request";
import { AppBody } from "@app/app";

export const initApp = async (req: AppRequest<AppBody>, res: Response, next: NextFunction) => {
  try {
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
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
