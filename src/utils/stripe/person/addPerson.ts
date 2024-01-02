import stripe from "../connection";

export = async ({ id }) => {
  return await stripe.accounts.createPerson(id);
};
