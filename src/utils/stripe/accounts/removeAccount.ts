import stripe from "../connection";

export = async ({ id }) => await stripe.accounts.del(id);
