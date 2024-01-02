import stripe  from "../connection";

module.exports = async ({ id, limit }) => {
  if (!id) return await stripe.reviews.list({ limit: limit || 30 });
  return await stripe.reviews.retrieve(id);
};
