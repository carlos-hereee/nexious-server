import stripe from "../connection.js";

export const loginLink = async ({ id }) => await stripe.accounts.createLoginLink(id);
