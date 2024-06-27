import { StripeRadarParams } from "@app/stripe";
import stripe from "../connection";

export const getRadarList = async ({ id, radarListOptions }: StripeRadarParams) => {
  if (!id) return await stripe.radar.valueLists.list(radarListOptions);
  return await stripe.radar.valueLists.retrieve(id);
};
