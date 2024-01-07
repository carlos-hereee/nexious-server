import stripe from "../connection";

export const updateCapabilities = async ({ id, type }) => {
  return await stripe.accounts.updateCapability(id, type, { requested: true });
};
