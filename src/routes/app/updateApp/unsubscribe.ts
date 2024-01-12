import type { MiddlewareProps } from "@app/express";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const unsubscribe: MiddlewareProps = async (req, res, next) => {
  try {
    req.user.subscriptions = req.user.subscriptions.filter((sub) => sub !== req.myApp._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
