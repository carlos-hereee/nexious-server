import stripe  from "../connection";

module.exports = async ({ id }) => {
  return await stripe.invoices.listLineItems(id);
};
