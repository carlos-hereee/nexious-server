import stripe from "../connection.js";

export const getFraudWarning = async ({ id, limit }) => {
  if (!id) {
    return await stripe.radar.earlyFraudWarnings.list({ limit: limit || 30 });
  }
  return await stripe.radar.earlyFraudWarnings.retrieve(id);
};
