const stripe = require("../connection");

module.exports = async ({ country, email }) => {
  if (!email) email = "example@email.com";
  return await stripe.accounts.create({
    country,
    email,
    type: "custom",
    // required for type = custom
    capabilities: {
      card_payments: { requested: true },
      transfers: { requested: true },
    },
  });
};
