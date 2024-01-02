import stripe from "../connection";

export = async ({ id }) => {
  return await stripe.topups.cancel(id);
};
