import stripe from "../connection";

export const deleteBank = async ({ id, accountId }) => {
  return await stripe.accounts.deleteExternalAccount(id, accountId);
};
