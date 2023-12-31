const stripe = require("../connection");

module.exports = async ({ id, metadata, description }) => {
  return await stripe.products.update(id, { metadata, description });
};
