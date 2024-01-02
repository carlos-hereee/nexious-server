const stripe = require("../connection");

module.exports = async ({ id }) => {
  return await stripe.invoices.listLineItems(id);
};
