import stripe  from "../connection";

module.exports = async ({ country, email }) => {
  return await stripe.accounts.update({
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
