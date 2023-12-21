const stripe = require("../connection");

module.exports = async ({ id }) => {
  return await stripe.topups.cancel(id);
};
