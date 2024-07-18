import { StripePaymentIntentParams } from "@app/stripe";
import stripe from "../connection";

export const paymentInitent = async ({ initentOptions }: StripePaymentIntentParams) => {
  if (!initentOptions) throw Error("initentOptions is required");
  return await stripe.paymentIntents.create(initentOptions);
};
