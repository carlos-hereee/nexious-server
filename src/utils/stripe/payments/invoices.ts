import stripe from "../connection";

export const invoices = async ({ id }) => {
  return await stripe.invoices.listLineItems(id);
};
