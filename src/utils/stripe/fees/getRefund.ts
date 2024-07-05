import { StripeFeeParams } from "@app/stripe";
import stripe from "../connection";

export const getRefund = async ({ id, refundId, stripeAccount }: StripeFeeParams) => {
  if (!id) throw Error("id is required");
  if (!refundId) throw Error("refundId is required");
  return await stripe.applicationFees.retrieveRefund(id, refundId, stripeAccount);
};
export const getRefundList = async ({ id, refundList, stripeAccount }: StripeFeeParams) => {
  if (!id) throw Error("id is required");
  return await stripe.applicationFees.listRefunds(id, refundList, stripeAccount);
};
export const refund = async ({ id }: StripeFeeParams) => {
  if (!id) throw Error("id is required");
  return await stripe.applicationFees.createRefund(id);
};
