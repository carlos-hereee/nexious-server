import { StripeRadarParams } from "@app/stripe";
import stripe from "../connection";

export const removeRadarList = async ({ id, removeRadarList }: StripeRadarParams) => {
  if (!id) throw Error("id is required");
  return await stripe.radar.valueLists.del(id, removeRadarList);
};
