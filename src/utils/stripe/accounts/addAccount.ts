import stripe from "../connection";

export = async ({ country, email, type }) => {
  if (!email) email = "example@email.com";
  if (!type) type = "custom";
  return await stripe.accounts.create({
    country,
    email,
    type,
    // required for type = custom
    // capabilities: {
    //   card_payments: { requested: true },
    //   transfers: { requested: true },
    // },
  });
};
