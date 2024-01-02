import stripe from "../connection";

export = async ({ id, accountId }) => {
  return await stripe.accounts.retrieveExternalAccount(id, accountId);
};
