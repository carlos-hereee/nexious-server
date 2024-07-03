import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
// import Subscription from "@db/schema/subscription";
// import { generateStringUrl } from "@utils/app/generateUrl";
// // import { formatSubFeatureData } from "@utils/app/format/formatSubData";
// import { updateAllUsers } from "@db/models/users/updateUsers";
// // import { addProductInfo } from "@routes/store/stripe/addProductInfo";
// // import { getStore } from "@db/models/store/getStore";
// import { addNotification } from "@utils/app/addNotification";
import { SubscriptionSchema } from "@app/app";

export const updateSubscription = async (req: AppRequest<SubscriptionSchema>, res: Response, next: NextFunction) => {
  try {
    const subscription = req.body;
    console.log("req.params :>> ", req.params);
    // let accountId = "";
    // let currency = "";
    // let isPlatformSubscription = false;
    // const isPlatformSubscription = false;
    // format features
    console.log("body :>> ", subscription);
    // // if app was found
    // if (req.project) {
    //   const store = await getStore({ appId: req.project._id });
    //   // add sub to stripe
    //   if (store?.currency) currency = store.currency;
    //   if (store?.accountId) accountId = store.accountId;
    //   // otherwise request is a platform request
    // } else isPlatformSubscription = true;
    // const { merch } = await addProductInfo({ merch: subscription, accountId, currency });

    return;
    // // if platform request add new subscription to all users account
    // if (isPlatformSubscription) {
    //   // create notification
    //   const notification = await addNotification({ type: "app-update", message: "A new subscription was added" });
    //   req.user.notifications.push(notification._id);
    //   await updateAllUsers({ type: "add-subscription", subscriptionId: Sub._id });
    //   // save to db
    //   await req.user.save();
    //   // otherwise add subscription to project
    // } else {
    //   req.project.subscriptions.push(Sub._id);
    //   // save to db
    //   await req.project.save();
    // }
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
