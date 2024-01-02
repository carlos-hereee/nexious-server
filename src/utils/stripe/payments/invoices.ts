import stripe from "../connection";

export = async ({ id }) => {
  return await stripe.invoices.listLineItems(id);
};
