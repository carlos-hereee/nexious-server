import { StripeRadarParams } from "types/stripe";
import stripe from "../connection";

export const approveReview = async ({ id }: StripeRadarParams) => {
  if (!id) throw Error("id is required");
  return await stripe.reviews.approve(id);
};
