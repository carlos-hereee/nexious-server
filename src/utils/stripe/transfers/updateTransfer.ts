const stripe = require("../connection");

// This request accepts only metadata as an argument.
module.exports = async ({ metadata, id }) => {
  return await stripe.transfers.update(id, { metadata });
};
