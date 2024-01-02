import stripe from "../connection";

export = async ({ id }) => {
  if (id) return await stripe.customers.del(id);
};
