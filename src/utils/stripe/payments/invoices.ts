import stripe from "../connection.js";

export const invoices = async ({ id }) => {
  return await stripe.invoices.listLineItems(id);
};
