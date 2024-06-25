import type { StripeSecretParams } from "types/stripe";
import stripe from "../connection";

export const setSecret = async ({ secretOptions }: StripeSecretParams) => {
  if (!secretOptions) throw Error("secretOptions is required");
  return await stripe.apps.secrets.create(secretOptions);
};
