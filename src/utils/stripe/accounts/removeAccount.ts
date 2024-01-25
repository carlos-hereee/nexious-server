import stripe from "../connection.js";

export const removeAccount = async ({ id }) => await stripe.accounts.del(id);
