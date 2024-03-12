import { useGenericErrors } from "@utils/auth/useGenericErrors";
import themeList from "@db/data/app/themeList.json";
import { NextFunction, Response } from "express";
import { AppRequest } from "@app/request";
import Page from "@db/schema/page";
import App from "@db/schema/app";
import { IPageSchema } from "@app/page";
import data from "@db/data/lorem.json";

export const initApp = async (req: AppRequest, res: Response, next: NextFunction) => {
  try {
    // key variables
    const appName = req.body.appName;
    const appUrl = appName.split(" ").join("+");
    const logo = req.asset || "";
    const owner = req.user._id;
    // const logo = { url: req.asset, alt: appName + " industry brand", link: appUrl };
    const adminIds = [{ userId: req.user.userId, role: "owner" }];
    // add inital landing page data
    const landing: IPageSchema = await Page.create({ type: "landing", tagline: `${data.title}` });
    // const themeLis
    const app = await App.create({ appName, logo, owner, adminIds, themeList, appUrl, landing: landing._id });
    // add user permissions
    req.project = app;
    req.user.ownedApps.push(app._id);
    req.user.permissions.push({ appId: app._id, role: "owner" });
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "app build error: ");
  }
};
