import stripe from "../connection.js";

export const updateProduct = async ({ id, metadata, description }) => {
  return await stripe.products.update(id, { metadata, description });
};
