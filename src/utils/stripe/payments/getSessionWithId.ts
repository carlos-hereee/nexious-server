import type { StripeSession } from "@app/stripe.js";
import stripe from "../connection.js";

export const getSessionWithId = async ({ id, options }: StripeSession) => {
  if (options) return await stripe.checkout.sessions.retrieve(id, options);
  return await stripe.checkout.sessions.retrieve(id);
};
