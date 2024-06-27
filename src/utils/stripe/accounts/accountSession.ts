import { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";

export const accountSession = async ({ accountSession }: StripeAccountParams) => {
  if (!accountSession) throw Error("accountSession is required");
  return await stripe.accountSessions.create(accountSession);
};
