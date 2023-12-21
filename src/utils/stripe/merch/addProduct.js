const stripe = require("../connection");

module.exports = async ({ name, description, images, stripeAccount }) => {
  if (!description) description = "product information: " + name;
  if (!images) images = [""];
  if (stripeAccount) {
    return await stripe.products.create({ name, description, images }, { stripeAccount });
  }
  return await stripe.products.create({ name, description, images });
};
