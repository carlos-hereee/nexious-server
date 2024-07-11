import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
import { SubscriptionSchema } from "@app/app";
import { v4 } from "uuid";
import { getSubscription } from "@db/models/subscription/getSubscription";
import { addPrice } from "@utils/stripe/merch/addProduct";

export const editPlatformSub = async (req: AppRequest<SubscriptionSchema>, res: Response, next: NextFunction) => {
  try {
    const { subscriptionId } = req.params;
    const sub = await getSubscription({ subscriptionId });
    // require subscription to be found
    // TODO: CREATE ERROR MESSAGE
    if (!sub) return res.status(404).end();

    // update new data
    if (sub.name !== req.body.name) sub.name = req.body.name;
    if (sub.description !== req.body.description) sub.description = req.body.description;
    if (sub.recurring !== req.body.recurring) sub.recurring = req.body.recurring;
    if (sub.addFeatures !== req.body.addFeatures) sub.addFeatures = req.body.addFeatures;
    sub.features = req.body.features.map((f) => ({ ...f, featureId: v4() }));
    // // if price was updated generate a new price id
    if (sub.cost !== req.body.cost) {
      // TODO: NOTIFY CUSTOMERS OF PRICE CHANGE
      await addPrice({ merch: sub, currency: "usd", accountId: "" });
      sub.cost = req.body.cost;
      sub.isActive = true;
    }
    // save to db
    await sub.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured updateing subscription");
  }
};
