import stripe from "../connection";

export = async ({ id, cardId }) => {
  return await stripe.accounts.retrieveExternalAccount(id, cardId);
};
