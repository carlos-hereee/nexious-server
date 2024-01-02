import stripe from "../connection";

export = async ({ id }) => await stripe.accounts.createLoginLink(id);
