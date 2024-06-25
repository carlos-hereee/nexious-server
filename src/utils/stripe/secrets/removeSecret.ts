import type { StripeSecretParams } from "types/stripe";
import stripe from "../connection";

export const removeSecret = async ({ removeSecretOptions }: StripeSecretParams) => {
  if (!removeSecretOptions) throw Error("removeSecretOptions is required");
  return await stripe.apps.secrets.deleteWhere(removeSecretOptions);
};
