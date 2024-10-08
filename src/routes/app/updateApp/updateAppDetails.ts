import type { AppRequest } from "@app/request";
import { addNotification } from "@utils/app/addNotification";
// import { formatLanguageList } from "@utils/app/format/formatLanguageList";
import { generateStringUrl, generateThemeList } from "@utils/app/generateUrl";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateAppDetails = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const { theme, appName, email } = req.body;
    // update appname
    if (appName) {
      req.project.appName = appName;
      req.project.appUrl = `/app/${generateStringUrl(appName)}`;
      req.project.appLink = `/${generateStringUrl(appName)}`;
    }
    // req.asset middleware yields asset url
    if (req.asset && req.asset !== req.project.logo) req.project.logo = req.asset;
    // TODO: ADD APP LOCALE
    // req.project.locale = locale;
    if (email !== req.project.email) req.project.email = email;
    req.project.themeList = generateThemeList(theme);
    // create notification
    const n = await addNotification({ type: "appChanges", message: "Successfully added app details", user: req.user });
    // on success link notification to app
    if (n) req.project.notifications.push(n._id);
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit app details");
  }
};
