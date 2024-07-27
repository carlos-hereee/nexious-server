import type { AppRequest } from "@app/request";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const updateMenuItem = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    // const { theme, appName, email } = req.body;
    // console.log("req.params :>> ", req.params);
    // req.project.menu = req.project.menu.map((m) => {
    //   if (m.menuId === req.params.menuId) {
    //     console.log("m :>> ", m);
    //   }
    //   return m;
    // });
    req.project.menu.map((m) => {
      if (m.uid === req.params.menuId) {
        m.link = `/${m.category}${req.project.appLink}`;
        if (req.body.icon) m.icon = req.body.icon;
      }
      return m;
    });
    await req.project.save();
    // update appname
    // if (appName) {
    //   req.project.appName = appName;
    //   req.project.appUrl = `/app/${generateStringUrl(appName)}`;
    //   req.project.appLink = generateStringUrl(appName);
    // }
    // // req.asset middleware yields asset url
    // if (req.asset && req.asset !== req.project.logo) req.project.logo = req.asset;
    // // TODO: ADD APP LOCALE
    // // req.project.locale = locale;
    // if (email !== req.project.email) req.project.email = email;
    // req.project.themeList = formatThemeList(theme);
    // // create notification
    // const notification = await addNotification({ type: "app-update", message: "Successfully added app details" });
    // // on success link notification to app
    // if (notification) req.project.notifications.push(notification._id);
    // await req.project.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to edit app details");
  }
};
