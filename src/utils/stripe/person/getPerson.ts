import stripe from "../connection";

export const getPerson = async ({ id, personId, limit }) => {
  if (!personId)
    return await stripe.accounts.listPersons(id, {
      limit: limit || 30,
    });
  return await stripe.accounts.retrievePerson(id, personId);
};
