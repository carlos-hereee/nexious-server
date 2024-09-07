import { SubscriptionSchema } from "@app/app";
import { AuthRequest } from "@app/request";
import { StripeConfirmation } from "@app/stripe";
import { getSubscription } from "@db/models/subscription/getSubscription";
import { addNotification } from "@utils/app/addNotification";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";

export const linkSubscription = async (req: AuthRequest<StripeConfirmation>, res: Response, next: NextFunction) => {
  try {
    const confirmation = req.body;
    const subscription = await getSubscription({ productId: confirmation.metadata.productId });
    // require subscription data
    if (!subscription) return res.status(404).end();

    if (req.user.accountTier) {
      // populate account tier
      await req.user.populate("accountTier");
      const userAccount = req.user.accountTier as unknown as SubscriptionSchema;
      //  subscription already in db
      if (userAccount.productId === subscription.productId) return next();
      // platform subscription
      if (subscription.isPlatformSubscription) {
        req.user.accountTier = subscription._id;
        req.user.customerId = confirmation.customer;
      }
      // app subscription
      //  else req.user.subscriptions.push(subscription._id);
    }
    if (!req.user.accountTier) {
      // platform subscription
      if (subscription.isPlatformSubscription) {
        req.user.accountTier = subscription._id;
        req.user.customerId = confirmation.customer;
      }
      // app subscription
      //  else req.user.subscriptions.push(subscription._id);
    }
    // create Notifications
    const n = await addNotification({
      type: "accountChanges",
      message: `${subscription.name} was added successfully`,
      user: req.user,
    });
    if (n) req.user.notifications.push(n._id);

    // // save data to db
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to link subscriptions");
  }
};
