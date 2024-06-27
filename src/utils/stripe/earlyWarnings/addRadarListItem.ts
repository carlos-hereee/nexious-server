import { StripeRadarParams } from "@app/stripe";
import stripe from "../connection";

export const addRadarListItem = async ({ addRadarItemOptions }: StripeRadarParams) => {
  if (!addRadarItemOptions) throw Error("addRadarItemOptions is required");
  return await stripe.radar.valueListItems.create(addRadarItemOptions);
};
