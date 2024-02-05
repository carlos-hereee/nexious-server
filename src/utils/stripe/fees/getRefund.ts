import { StripeFeeParams } from "@app/stripe";
import stripe from "../connection";

export const getRefund = async ({ id, refundId, stripeAccount }: StripeFeeParams) => {
  if (!id) throw Error("id is required");
  if (!refundId) throw Error("refundId is required");
  // if (!refundId) await stripe.applicationFees.listRefunds(id, stripeAccount);
  return await stripe.applicationFees.retrieveRefund(id, refundId, stripeAccount);
};
