import { StripeAccountParams } from "@app/stripe";
import stripe from "../connection";
import { stripeRefreshUrl, stripeReturnUrl } from "@utils/app/config";

export const accountLinks = async ({ accountId }: StripeAccountParams) => {
  if (!accountId) throw Error("accountLink is required");
  return await stripe.accountLinks.create({
    account: accountId,
    type: "account_onboarding",
    refresh_url: stripeRefreshUrl,
    return_url: stripeReturnUrl,
  });
};
