import { StripeSecretParams } from "@app/stripe";
import stripe from "../connection";

export const getSecret = async ({ findSecretOptions }: StripeSecretParams) => {
  if (!findSecretOptions) throw Error("findSecretOptions is required");
  return await stripe.apps.secrets.find(findSecretOptions);
};

export const listSecret = async ({ listOptions }: StripeSecretParams) => {
  if (!listOptions) throw Error("listOptions is required");
  return await stripe.apps.secrets.list(listOptions);
};
export const removeSecret = async ({ removeSecretOptions }: StripeSecretParams) => {
  if (!removeSecretOptions) throw Error("removeSecretOptions is required");
  return await stripe.apps.secrets.deleteWhere(removeSecretOptions);
};
export const setSecret = async ({ secretOptions }: StripeSecretParams) => {
  if (!secretOptions) throw Error("secretOptions is required");
  return await stripe.apps.secrets.create(secretOptions);
};
