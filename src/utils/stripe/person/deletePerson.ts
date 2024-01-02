import stripe from "../connection";

export = async ({ id, personId }) => await stripe.accounts.deletePerson(id, personId);
