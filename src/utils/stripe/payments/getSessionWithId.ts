import type { StripeSession } from "@app/stripe";
import stripe from "../connection";

export const getSessionWithId = async ({ id, options }: StripeSession) => {
  if (options) return await stripe.checkout.sessions.retrieve(id, options);
  return await stripe.checkout.sessions.retrieve(id);
};
