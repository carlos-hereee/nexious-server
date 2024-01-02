import stripe from "../connection";

export = async ({ id, type }) => {
  return await stripe.accounts.updateCapability(id, type, { requested: true });
};
