import stripe from "../connection.js";

export const deleteCard = async ({ id, cardId }) => {
  return await stripe.accounts.deleteExternalAccount(id, cardId);
};
