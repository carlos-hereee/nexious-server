import stripe from "../connection";

export const deleteCustomer = async ({ id }) => {
  if (id) return await stripe.customers.del(id);
};
