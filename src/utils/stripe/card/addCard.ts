import stripe  from "../connection";

// https://stripe.com/docs/api/external_account_cards/create
module.exports = async ({ id, cardDetails }) => {
  return await await stripe.accounts.createExternalAccount(id, {
    // A token, like the ones returned by Stripe.js or a dictionary
    // containing a user’s card details
    // Stripe will automatically validate the card.
    external_account: cardDetails,
  });
};
