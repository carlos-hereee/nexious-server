import { StripeRadarParams } from "types/stripe";
import stripe from "../connection";

export const updateRadarList = async ({ id, updateRadar, stripeAccount }: StripeRadarParams) => {
  if (!id) throw Error("id is required");
  return await stripe.radar.valueLists.update(id, updateRadar, stripeAccount);
};
