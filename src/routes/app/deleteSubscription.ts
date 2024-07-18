import { useGenericErrors } from "@utils/auth/useGenericErrors";
import { NextFunction, Response } from "express";
import type { AppRequest } from "@app/request";
import { SubscriptionSchema } from "@app/app";
import { removeSubscription } from "@db/models/subscription/updateSubscriptions";
// import { updateAllUsers } from "@db/models/users/updateUsers";

export const deleteSubscription = async (req: AppRequest<SubscriptionSchema>, res: Response, next: NextFunction) => {
  try {
    await removeSubscription(req.params.subscriptionId);
    // await removeSubscription(req.params.subscriptionId);
    // TODO: REMOVE FROM STRIPE
    // TODO: MOVE TO ARCHIVE
    // console.log("removal :>> ", removal);
    next();
  } catch (error) {
    useGenericErrors(res, error, "error occured removing app");
  }
};
