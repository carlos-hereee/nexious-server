const stripe = require("../connection");

module.exports = async ({ name, description, images, stripeAccount }) => {
  if (stripeAccount) {
    return await stripe.products.create({ name, description, images }, { stripeAccount });
  }
  return await stripe.products.create({ name, description, images });
};
