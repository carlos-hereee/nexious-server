import stripe  from "../connection";

module.exports = async ({ id, limit }) => {
  if (!id) return await stripe.accounts.list({ limit: limit || 30 });
  return await stripe.accounts.retrieve(id);
};
