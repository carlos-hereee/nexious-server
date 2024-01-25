import stripe from "../connection.js";

export const deleteCustomer = async ({ id }) => {
  if (id) return await stripe.customers.del(id);
};
