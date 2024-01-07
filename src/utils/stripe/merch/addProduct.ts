import stripe from "../connection";

export const addProduct = async ({ name, description, images, stripeAccount }) => {
  if (!description) description = "product information: " + name;
  if (!images) images = undefined;
  if (stripeAccount) {
    return await stripe.products.create({ name, description, images }, { stripeAccount });
  }
  return await stripe.products.create({ name, description, images });
};