import type { StripeSession } from "@app/stripe";
import stripe from "../connection";

export const getSessionWithId = async ({ id, options }: StripeSession) => {
  if (!id) throw Error("id is required");
  return await stripe.checkout.sessions.retrieve(id, options);
};
