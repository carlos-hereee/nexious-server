import stripe from "../connection.js";

export const addTransfer = async ({ amount, currency, destination, group }) => {
  if (!currency) currency = "usd";

  return await stripe.transfers.create({ amount, currency, destination, transfer_group: group });
};
