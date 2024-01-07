import { stripeErrorHandling } from "@stripe/errors";
import constructEvent from "./constructEvent";
import type { MiddlewareProps } from "@app/app";

export const initHook: MiddlewareProps = async (req, res, next) => {
  try {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];
    req.event = constructEvent({ sig, payload });
    next();
  } catch (err) {
    stripeErrorHandling(res, err, "webhook error: ");
  }
};
