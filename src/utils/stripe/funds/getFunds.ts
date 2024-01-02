import stripe  from "../connection";

module.exports = async ({ id, limit }) => {
  if (!id) return await stripe.topups.list({ limit: limit || 30 });
  return await stripe.topups.retrieve(id);
};
