import { StripeSecretParams } from "types/stripe";
import stripe from "../connection";

export const getSecret = async ({ findSecretOptions }: StripeSecretParams) => {
  if (!findSecretOptions) throw Error("findSecretOptions is required");
  return await stripe.apps.secrets.find(findSecretOptions);
};
