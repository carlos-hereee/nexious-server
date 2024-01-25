import stripe from "../connection.js";

export const getBank = async ({ id, accountId }) => {
  return await stripe.accounts.retrieveExternalAccount(id, accountId);
};
