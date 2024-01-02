import stripe  from "../connection";

module.exports = async ({ email, name, stripeAccount }) => {
  // preferred_locale: ["en", "es"]
  if (email && name) return await stripe.customers.create({ email, name }, { stripeAccount });
  return await stripe.customers.create();
  // const customers = await stripe.customers.create()
  // console.log('customers :>> ', customers);
};
