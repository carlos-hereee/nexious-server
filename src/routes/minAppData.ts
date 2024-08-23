import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import type { AppRequest, MinAppResponseData } from "@app/request";

export const minAppData = async (req: AppRequest, res: Response) => {
  try {
    // init response data
    const data: MinAppResponseData = {};
    // populate user data required by client
    if (req.user) {
      const userData = `ownedApps subscriptions permissions ownedApps.userId${
        req.user.notifications ? " notifications" : ""
      }${req.user.subscriptions ? " subscriptions" : ""}${req.user.accountTier ? " accountTier" : ""}${
        req.user.orders ? " orders" : ""
      }${req.user.messages ? " messages" : ""}`;
      // depopulate auth data for security
      const user = await req.user.depopulate("auth").populate(userData);
      data.user = user;
    }
    // populate app data required by client
    if (req.project) {
      const appData = `owner adminIds landing pages calendar notifications${req.project.subscriptions ? " subscriptions" : ""}${
        req.project.posts ? " posts" : ""
      }${req.project.messages ? " messages" : ""}${req.project.maps ? " maps" : ""}`;
      const app = await req.project.populate(appData);
      data.app = app;
    }
    // add calendar data
    if (req.calendar) {
      const calendar = await req.calendar.populate("events schedule");
      data.calendar = calendar;
    }
    // add post data
    if (req.post) data.post = req.post;
    // populate inventory in response
    if (req.store) {
      const storeData = `inventory${req.store.notifications ? " notifications" : ""}${req.store.orders ? " orders" : ""}`;
      const store = await req.store.populate(storeData);
      data.store = store;
    }
    // add stripe account data in response
    if (req.account) data.account = req.account;
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
