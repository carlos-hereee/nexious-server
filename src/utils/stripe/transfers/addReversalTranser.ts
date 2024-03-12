import type { StripeTransferParams } from "@app/stripe";
import stripe from "../connection";

export const addReversalTranser = async (params: StripeTransferParams) => {
  const { id, options, transferReversalOptions } = params;
  if (!id) throw Error("Id is required");
  if (!transferReversalOptions) throw Error("tranfers is required");
  return await stripe.transfers.createReversal(id, transferReversalOptions, options);
};
