import stripe from "../connection";

export const updateBank = async ({ metadata, id, accountId }) => {
  return await stripe.accounts.updateExternalAccount(id, accountId, {
    metadata,
  });
};
