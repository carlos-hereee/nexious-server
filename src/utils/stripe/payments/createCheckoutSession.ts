import stripe from "../connection";
import { StripeSession } from "types/stripe";

export const createCheckoutSession = async ({ sessionOptions, stripeAccount }: StripeSession) => {
  return await stripe.checkout.sessions.create(sessionOptions, stripeAccount);
};
