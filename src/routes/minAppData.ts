import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";
import type { AppRequest, MinAppResponseData } from "@app/request";
import { postsPopulate } from "@db/data/app/post.json";

export const minAppData = async (req: AppRequest, res: Response) => {
  try {
    // init response data
    const data: MinAppResponseData = {};
    // populate user data required by client
    if (req.user) {
      const userData =
        "ownedApps subscriptions permissions ownedApps.userId notifications subscriptions accountTier orders messages";
      // depopulate auth data for security
      const user = await req.user.depopulate("auth").populate(userData, { options: { strictPopulate: false } });
      data.user = user;
    }
    // populate app data required by client
    if (req.project) {
      const appData = "owner adminIds landing pages calendar notifications  subscriptions posts messages maps";
      const app = await req.project.populate(appData, { options: { strictPopulate: false } });
      data.app = app;
    }
    // add calendar data
    if (req.calendar) {
      const calendar = await req.calendar.populate("events schedule", { options: { strictPopulate: false } });
      data.calendar = calendar;
    }
    // add post data
    if (req.post) {
      const post = await req.post.populate({
        path: "comments",
        populate: postsPopulate,
        options: { strictPopulate: false },
      });
      data.post = post;
    }
    // populate inventory in response
    if (req.store) {
      const storeData = "inventory notifications orders inventory.reviews";
      const store = await req.store.populate(storeData, { options: { strictPopulate: false } });
      data.store = store;
    }
    // populate inventory in response
    if (req.merch) {
      const merch = await req.merch.populate({
        path: "reviews",
        populate: postsPopulate,
        options: { strictPopulate: false },
      });
      data.merch = merch;
    }
    // add stripe account data in response
    if (req.account) data.account = req.account;
    if (req.message) {
      const message = await req.message.populate({
        path: "replies",
        populate: postsPopulate,
        options: { strictPopulate: false },
      });
      data.message = message;
    }
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
