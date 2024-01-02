import stripe from "../connection";

export = async ({ amount, destination }) => {
  return await stripe.transfers.createReversal({ amount, destination });
};
