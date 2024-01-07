import stripe from "../connection";

export const getSessionWithId = async ({ id, options }) => {
  if (options) return await stripe.checkout.sessions.retrieve(id, options);
  return await stripe.checkout.sessions.retrieve(id);
};
