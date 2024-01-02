import stripe  from "../connection";

module.exports = async ({ id, type }) => {
  return await stripe.accounts.updateCapability(id, type, { requested: true });
};
