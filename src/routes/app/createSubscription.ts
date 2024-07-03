import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
import Subscription from "@db/schema/subscription";
import { generateStringUrl } from "@utils/app/generateUrl";
// import { updateAllUsers } from "@db/models/users/updateUsers";
import { addProductInfo } from "@routes/store/stripe/addProductInfo";
import { getStore } from "@db/models/store/getStore";
import { addNotification } from "@utils/app/addNotification";
import { SubscriptionSchema } from "@app/app";

export const createSubscription = async (req: AppRequest<SubscriptionSchema>, res: Response, next: NextFunction) => {
  try {
    let accountId = "";
    let currency = "usd";
    let isPlatformSubscription = false;
    // if app was found
    if (req.project) {
      const store = await getStore({ appId: req.project._id });
      // add sub to stripe
      if (store?.currency) currency = store.currency;
      if (store?.accountId) accountId = store.accountId;
      // otherwise request is a platform request
    } else isPlatformSubscription = true;
    // add subscription to stripe
    const { merch } = await addProductInfo({ merch: req.body, accountId, currency });

    const Sub = await Subscription.create({
      ...req.body,
      link: generateStringUrl(merch.name),
      // add property to find later
      isPlatformSubscription,
      isActive: true,
      productId: merch.productId,
      priceId: merch.priceId,
    });
    // if platform request add new subscription to all users account
    if (isPlatformSubscription) {
      // create notification
      const notification = await addNotification({ type: "app-update", message: "A new subscription was added" });
      req.user.notifications.push(notification._id);
      // add subscription to all users
      // await updateAllUsers({ type: "add-subscription", subscriptionId: Sub._id });
      await req.user.save();
      // otherwise add subscription to project
    } else {
      req.project.subscriptions.push(Sub._id);
      // save to db
      await req.project.save();
    }
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
