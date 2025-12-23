import type { AppRequest, MinAppResponseData } from "@app/request";
import { appPopulateData, postsPopulate } from "@db/data/app/dbPopulateData.json";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { Response } from "express";

export const minAppData = async (req: AppRequest, res: Response) => {
  try {
    // init response data
    const data: MinAppResponseData = {};
    // populate user data required by client
    if (req.user) {
      // depopulate auth data for security
      const user = await req.user.depopulate("auth").populate({
        path: "ownedApps subscriptions permissions ownedApps.userId boards.boardId notifications calendarEvents subscriptions accountTier orders",
        options: { strictPopulate: false },
      });
      data.user = user;
    }
    // populate app data required by client
    if (req.project) {
      const app = await req.project.populate(appPopulateData, { options: { strictPopulate: false } });
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
        options: { strictPopulate: false },
      });
      data.message = message;
    }
    res.status(200).json(data).end();
  } catch (error) {
    useGenericErrors(res, error, "error occurred sending client data");
  }
};
