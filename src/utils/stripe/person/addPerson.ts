import stripe from "../connection.js";

export const addPerson = async ({ id }) => {
  return await stripe.accounts.createPerson(id);
};
