const stripe = require("../connection");

module.exports = async ({ name }) => {
  return await stripe.products.create({ name, description, images });
};
