import type { CheckoutPortalSession, StripeAccountParams } from "@app/stripe";
import stripe from "../connection";
import { clientUrl, stripeRefreshUrl, stripeReturnUrl } from "@utils/app/config";

// create accountlink for onboarding
export const accountLinks = async ({ accountId }: StripeAccountParams) => {
  if (!accountId) throw Error("accountId is required");
  return await stripe.accountLinks.create({
    account: accountId,
    type: "account_onboarding",
    refresh_url: stripeRefreshUrl,
    return_url: stripeReturnUrl,
  });
};
// create account session
export const accountSession = async ({ accountSession }: StripeAccountParams) => {
  if (!accountSession) throw Error("accountSession is required");
  return await stripe.accountSessions.create(accountSession);
};

// This is the url to which the customer will be redirected when they are done
// managing their billing with the portal.
export const createPortalSession = async ({ customer }: CheckoutPortalSession) => {
  // require key variable
  if (!customer) throw Error("customer param is required");
  return await stripe.billingPortal.sessions.create({ customer: customer, return_url: clientUrl });
};
