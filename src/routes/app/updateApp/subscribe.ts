import type { MiddlewareProps } from "@app/db";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const subscribe: MiddlewareProps = async (req, res, next) => {
  try {
    req.user.subscriptions.push(req.apps._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
