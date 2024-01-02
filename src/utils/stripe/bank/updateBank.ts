import stripe from "../connection";

export = async ({ metadata, id, accountId }) => {
  return await stripe.accounts.updateExternalAccount(id, accountId, {
    metadata,
  });
};
