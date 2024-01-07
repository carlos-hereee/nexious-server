import type { MiddlewareProps } from "@app/app";
import { useGenericErrors } from "@authUtils/useGenericErrors";

export const subscribe: MiddlewareProps = async (req, res, next) => {
  try {
    req.user.subscriptions.push(req.app._id);
    await req.user.save();
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to save subscription");
  }
};
