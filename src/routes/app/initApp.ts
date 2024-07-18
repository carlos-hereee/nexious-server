import { useGenericErrors } from "@utils/auth/useGenericErrors";
import themeList from "@db/data/app/themeList.json";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
import Page from "@db/schema/page";
import App from "@db/schema/app";
import { IPageSchema } from "@app/page";
import data from "@db/data/lorem.json";
import { generateStringUrl } from "@utils/app/generateUrl";
import { addNotification } from "@utils/app/addNotification";

export const initApp = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const appName = req.body.appName.trim();
    const logo = req.asset || "";
    const owner = req.user._id;
    const adminIds = [{ userId: req.user.userId, role: "owner" }];
    // add inital landing page data
    const landing: IPageSchema = await Page.create({ type: "landing", tagline: `${data.title}` });
    const appUrl = `app/${generateStringUrl(appName)}`;
    const appLink = generateStringUrl(appName);
    // const themeLis
    const appData = { appLink, appName, logo, owner, adminIds, themeList, appUrl, landing: landing._id, dbVersion: "1.0.0" };
    const app = await App.create(appData);
    // add user permissions
    req.project = app;
    req.user.ownedApps.push(app._id);
    req.user.permissions.push({ appId: app._id, role: "owner" });
    // add notification
    const n = await addNotification({ type: "app-update", message: "App creation was successful" });
    req.user.notifications.push(n._id);
    // save to db
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
