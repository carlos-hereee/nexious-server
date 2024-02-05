import stripe from "../connection";

export const removeAccount = async ({ id }) => await stripe.accounts.del(id);
