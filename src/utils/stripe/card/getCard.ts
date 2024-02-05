import stripe from "../connection";

export const getCard = async ({ id, cardId }) => {
  return await stripe.accounts.retrieveExternalAccount(id, cardId);
};
