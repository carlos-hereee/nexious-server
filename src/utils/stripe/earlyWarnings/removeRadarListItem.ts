import { StripeRadarParams } from "@app/stripe";
import stripe from "../connection";

export const removeRadarListItem = async ({ id, removeRadarItem }: StripeRadarParams) => {
  if (!id) throw Error("id is required");
  return await stripe.radar.valueListItems.del(id, removeRadarItem);
};
