import type { StripeSecretEventParams } from "@app/stripe";
import stripe from "../connection";

export const removeSecret = async ({ removeSecretOptions }: StripeSecretEventParams) => {
  if (!removeSecretOptions) throw Error("removeSecretOptions is required");
  return await stripe.apps.secrets.deleteWhere(removeSecretOptions);
};
