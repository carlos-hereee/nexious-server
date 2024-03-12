import { StripeRadarParams } from "@app/stripe";
import stripe from "../connection";

export const getFraudWarning = async ({ id, fruadList }: StripeRadarParams) => {
  if (!id) {
    return await stripe.radar.earlyFraudWarnings.list(fruadList);
  }
  return await stripe.radar.earlyFraudWarnings.retrieve(id);
};
