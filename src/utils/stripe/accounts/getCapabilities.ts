import stripe from "../connection";

export = async ({ id, type }) => {
  if (!type) return await stripe.accounts.listCapabilities(id);
  return await stripe.accounts.retrieveCapability(id, type);
};
