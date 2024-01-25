import stripe from "../connection.js";

export const approveReview = async ({ id }) => await stripe.reviews.approve(id);
