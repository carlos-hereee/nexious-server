import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
import type { AccountTier } from "@app/user";
import Subscription from "@db/schema/subscription";
import { generateStringUrl } from "@utils/app/generateUrl";
import { formatSubFeatureData } from "@utils/app/format/formatSubData";
import { addProductInfo } from "@routes/store/stripe/addProductInfo";
import { updateAllUsers } from "@db/models/users/updateUsers";
import { getStore } from "@db/models/store/getStore";
import { addNotification } from "@utils/app/addNotification";

interface Body {
  subscription: AccountTier;
}
export const createSubscription = async (req: AppRequest<Body>, res: Response, next: NextFunction) => {
  try {
    const { subscription } = req.body;
    let accountId = "";
    let currency = "usd";
    let isPlatformSubscription = false;
    // format features
    const features = formatSubFeatureData(req.body.subscription.features);
    // console.log("features :>> ", features);
    // if app was found
    if (req.project) {
      const store = await getStore({ appId: req.project._id });
      // add sub to stripe
      if (store?.currency) currency = store.currency;
      if (store?.accountId) accountId = store.accountId;
      // otherwise request is a platform request
    } else isPlatformSubscription = true;
    const { merch } = await addProductInfo({ merch: subscription, accountId, currency });

    const Sub = await Subscription.create({
      name: merch.name,
      link: generateStringUrl(merch.name),
      description: merch.description,
      recurring: merch.recurring,
      // add property to find later
      isPlatformSubscription,
      cost: merch.cost,
      productId: merch.productId,
      priceId: merch.priceId,
      // TODO: FEATURE NAME AND VALUE DONT SAVE TO DB
      features: features,
    });
    // if platform request add new subscription to all users account
    if (isPlatformSubscription) {
      // create notification
      const notification = await addNotification({ type: "app-update", message: "A new subscription was added" });
      req.user.notifications.push(notification._id);
      await updateAllUsers({ type: "add-subscription", subscriptionId: Sub._id });
      // save to db
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
