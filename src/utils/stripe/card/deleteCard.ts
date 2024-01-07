import stripe from "../connection";

export const deleteCard = async ({ id, cardId }) => {
  return await stripe.accounts.deleteExternalAccount(id, cardId);
};
