import stripe from "../connection.js";

export const updateBank = async ({ metadata, id, accountId }) => {
  return await stripe.accounts.updateExternalAccount(id, accountId, {
    metadata,
  });
};
