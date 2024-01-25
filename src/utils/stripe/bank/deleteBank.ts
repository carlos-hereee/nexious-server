import stripe from "../connection.js";

export const deleteBank = async ({ id, accountId }) => {
  return await stripe.accounts.deleteExternalAccount(id, accountId);
};
