import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
import { SubscriptionSchema } from "@app/app";
import { updateSubscriptions } from "@db/models/subscription/updateSubscriptions";
import { v4 } from "uuid";

export const editSubscription = async (req: AppRequest<SubscriptionSchema>, res: Response, next: NextFunction) => {
  try {
    const subscription = {
      ...req.body,
      isActive: true,
      features: req.body.features.map((f) => ({ ...f, featureId: v4() })),
    };
    await updateSubscriptions({ subscriptionId: req.params.subscriptionId, subscription });
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
