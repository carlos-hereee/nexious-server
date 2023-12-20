const stripe = require("../connection");

module.exports = async ({ customer }) => {
  return await stripe.customers.retrieve(customer);
};
