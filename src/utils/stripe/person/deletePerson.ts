import stripe from "../connection.js";

export const deletePerson = async ({ id, personId }) => await stripe.accounts.deletePerson(id, personId);
