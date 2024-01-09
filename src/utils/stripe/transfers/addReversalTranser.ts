import type { StripeRequestOptions } from "@app/stripe";
import stripe from "../connection";

export const addReversalTranser = async ({ id, options, transfer }: StripeRequestOptions) => {
  if (!id) throw Error("Id is required");
  if (!transfer) throw Error("tranfers is required");
  return await stripe.transfers.createReversal(id, transfer, options);
};
