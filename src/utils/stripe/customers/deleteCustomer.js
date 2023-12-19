const stripe = require("../connection");

module.exports = async ({ id }) => {
  if (id) return await stripe.customers.del(id);
};
