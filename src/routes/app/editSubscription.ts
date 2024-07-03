import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
import { SubscriptionSchema } from "@app/app";
import { updateSubscriptions } from "@db/models/subscription/updateSubscriptions";

export const editSubscription = async (req: AppRequest<SubscriptionSchema>, res: Response, next: NextFunction) => {
  try {
    await updateSubscriptions({ subscriptionId: req.params.subscriptionId, subscription: req.body });
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
