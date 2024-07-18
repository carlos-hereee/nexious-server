import type { StripeSession } from "@app/stripe";
import stripe from "../connection";

// get checkout session with id
export const getCheckoutSession = async ({ id, options, stripeAccount }: StripeSession) => {
  if (!id) throw Error("id is required");
  return await stripe.checkout.sessions.retrieve(id, options, stripeAccount);
};
// get checkout items session with id
export const getCheckoutItems = async ({ id, listOptions }: StripeSession) => {
  if (!id) throw Error("id is required");
  return await stripe.checkout.sessions.listLineItems(id, listOptions);
};
