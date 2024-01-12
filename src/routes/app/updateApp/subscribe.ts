import type { MiddlewareProps } from "@app/express";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const subscribe: MiddlewareProps = async (req, res, next) => {
  try {
    req.user.subscriptions.push(req.myApp._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
