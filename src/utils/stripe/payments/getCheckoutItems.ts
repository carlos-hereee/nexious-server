import stripe from "../connection";

export const getCheckoutItems = async ({ id }) => {
  return await stripe.checkout.sessions.listLineItems(id);
};
