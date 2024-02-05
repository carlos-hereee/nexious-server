import type { StripeSecretEventParams } from "@app/stripe";
import stripe from "../connection";

export const setSecret = async ({ secretOptions }: StripeSecretEventParams) => {
  if (!secretOptions) throw Error("secretOptions is required");
  return await stripe.apps.secrets.create(secretOptions);
};
