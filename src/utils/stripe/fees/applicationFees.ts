import stripe  from "../connection";

module.exports = async ({ id, limit }) => {
  if (!id) return await stripe.applicationFees.list({ limit: limit || 30 });
  return await stripe.applicationFees.retrieve(id);
};
