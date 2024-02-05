import stripe from "../connection";

export const deletePerson = async ({ id, personId }) =>
  await stripe.accounts.deletePerson(id, personId);
