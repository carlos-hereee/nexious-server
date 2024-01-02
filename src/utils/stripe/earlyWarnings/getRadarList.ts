import stripe  from "../connection";

module.exports = async ({ id, limit }) => {
  if (!id) return await stripe.radar.valueLists.list({ limit: limit || 30 });
  return await stripe.radar.valueLists.retrieve(id);
};
