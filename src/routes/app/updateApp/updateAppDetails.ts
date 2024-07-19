import type { AppRequest } from "@app/request";
import { addNotification } from "@utils/app/addNotification";
// import { formatLanguageList } from "@utils/app/format/formatLanguageList";
import { formatThemeList } from "@utils/app/format/formatThemeList";
import { generateStringUrl } from "@utils/app/generateUrl";
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
      req.project.appLink = generateStringUrl(appName);
    }
    // req.asset middleware yields asset url
    if (req.asset && req.asset !== req.project.logo) req.project.logo = req.asset;
    // TODO: ADD APP LOCALE
    // req.project.locale = locale;
    if (email !== req.project.email) req.project.email = email;
    req.project.themeList = formatThemeList(theme);
    // create notification
    const notification = await addNotification({ type: "app-update", message: "Successfully added app details" });
    // on success link notification to app
    if (notification) req.project.notifications.push(notification._id);
    await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit app details");
  }
};
