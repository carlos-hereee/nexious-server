import stripe from "../connection.js";

export const updateCapabilities = async ({ id, type }) => {
  return await stripe.accounts.updateCapability(id, type, { requested: true });
};
