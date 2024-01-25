import stripe from "../connection.js";

export const updatePerson = async ({ id, personId, metadata }) => {
  return await stripe.accounts.updatePerson(id, personId, {
    metadata,
  });
};
