import stripe from "../connection";

export const updateCard = async ({ id, cardId, metadata }) => {
  return await stripe.accounts.updateExternalAccount(id, cardId, {
    metadata,
  });
};
