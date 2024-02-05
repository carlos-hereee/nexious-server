import { StripeSecretEventParams } from "@app/stripe";
import stripe from "../connection";

export const getSecret = async ({ findSecretOptions }: StripeSecretEventParams) => {
  if (!findSecretOptions) throw Error("findSecretOptions is required");
  return await stripe.apps.secrets.find(findSecretOptions);
};
