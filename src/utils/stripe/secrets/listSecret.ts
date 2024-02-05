import { StripeSecretEventParams } from "@app/stripe";
import stripe from "../connection";

export const listSecret = async ({ listOptions }: StripeSecretEventParams) => {
  if (!listOptions) throw Error("listOptions is required");
  return await stripe.apps.secrets.list(listOptions);
};
