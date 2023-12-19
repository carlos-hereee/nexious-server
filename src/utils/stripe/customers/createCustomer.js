const stripe = require("../connection");

module.exports = async () => {
  return await stripe.customers.create();
  // const customers = await stripe.customers.create()
  // console.log('customers :>> ', customers);
};
