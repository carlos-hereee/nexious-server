import stripe  from "../connection";

module.exports = async ({ amount, currency, destination, group }) => {
  if (!currency) currency = "usd";

  return await stripe.transfers.create({ amount, currency, destination, transfer_group: group });
};
