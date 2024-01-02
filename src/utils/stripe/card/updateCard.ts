import stripe from "../connection";

export = async ({ id, cardId, metadata }) => {
  return await stripe.accounts.updateExternalAccount(id, cardId, {
    metadata,
  });
};
