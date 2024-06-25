import type { StripeSession } from "types/stripe";
import stripe from "../connection";

export const getSessionWithId = async ({ id, options, stripeAccount }: StripeSession) => {
  if (!id) throw Error("id is required");
  return await stripe.checkout.sessions.retrieve(id, options, stripeAccount);
};
