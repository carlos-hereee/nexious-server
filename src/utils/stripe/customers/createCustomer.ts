import stripe from "../connection.js";

export const createCustomer = async ({ email, name, stripeAccount }) => {
  // preferred_locale: ["en", "es"]
  if (email && name) return await stripe.customers.create({ email, name }, { stripeAccount });
  return await stripe.customers.create();
  // const customers = await stripe.customers.create()
  // console.log('customers :>> ', customers);
};
