import stripe from "../connection";

export const approveReview = async ({ id }) => await stripe.reviews.approve(id);
