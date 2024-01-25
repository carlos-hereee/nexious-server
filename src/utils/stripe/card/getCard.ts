import stripe from "../connection.js";

export const getCard = async ({ id, cardId }) => {
  return await stripe.accounts.retrieveExternalAccount(id, cardId);
};
