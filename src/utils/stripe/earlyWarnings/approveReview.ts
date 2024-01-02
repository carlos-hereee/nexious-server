import stripe from "../connection";

export = async ({ id }) => await stripe.reviews.approve(id);
