import { StripeRadarParams } from "@app/stripe";
import stripe from "../connection";

export const getRadarListItem = async ({ id, radarList }: StripeRadarParams) => {
  if (!id) {
    if (!radarList) throw Error("radarList is required");
    return await stripe.radar.valueListItems.list(radarList);
  }
  return await stripe.radar.valueListItems.retrieve(id);
};
