import stripe from "../connection";

export const addPerson = async ({ id }) => {
  return await stripe.accounts.createPerson(id);
};
