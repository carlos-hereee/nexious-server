import stripe from "../connection.js";

export const getCheckoutItems = async ({ id }) => {
  return await stripe.checkout.sessions.listLineItems(id);
};
