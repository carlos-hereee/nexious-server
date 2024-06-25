import { StripeRadarParams } from "types/stripe";
import stripe from "../connection";

export const getReview = async ({ id, reviewList, reviewOptions }: StripeRadarParams) => {
  if (!id) return await stripe.reviews.list(reviewList);
  return await stripe.reviews.retrieve(id, reviewOptions);
};
