import stripe from "../connection";

export const getBank = async ({ id, accountId }) => {
  return await stripe.accounts.retrieveExternalAccount(id, accountId);
};
