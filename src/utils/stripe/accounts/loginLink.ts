import stripe from "../connection";

export const loginLink = async ({ id }) => await stripe.accounts.createLoginLink(id);
