import stripe  from "../connection";

module.exports = async ({ customer }) => {
  return await stripe.customers.retrieve(customer);
};
