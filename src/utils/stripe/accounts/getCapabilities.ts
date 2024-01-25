import stripe from "../connection.js";

export const getCapabilities = async ({ id, type }) => {
  if (!type) return await stripe.accounts.listCapabilities(id);
  return await stripe.accounts.retrieveCapability(id, type);
};
