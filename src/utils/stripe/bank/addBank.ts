import stripe from "../connection.js";

// https://stripe.com/docs/api/external_account_bank_accounts/create
export const addBank = async ({ id, account }) => {
  return await stripe.accounts.createExternalAccount(id, {
    // Either a token, like the ones returned by Stripe.js,
    // or a dictionary containing a user’s bank account details
    external_account: account,
  });
};
