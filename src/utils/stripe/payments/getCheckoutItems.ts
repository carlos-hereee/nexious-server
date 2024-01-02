import stripe from "../connection";

export = async ({ id }) => {
  return await stripe.checkout.sessions.listLineItems(id);
};
