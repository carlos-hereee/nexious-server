import type { StripeRadarParams } from "types/stripe";
import stripe from "../connection";

export const addRadarList = async ({ addRadarList }: StripeRadarParams) => {
  if (!addRadarList) throw Error("addRadarList is required");
  return await stripe.radar.valueLists.create(addRadarList);
};
