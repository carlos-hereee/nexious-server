const stripe = require("../connection");

module.exports = async ({ id, metadata }) => {
  return await stripe.topups.update(id, { metadata });
};
