import { StripePaymentIntentParams } from "types/stripe";
import stripe from "../connection";

export const invoices = async ({ id, invoiceOptions }: StripePaymentIntentParams) => {
  if (!id) throw Error("id is required");
  return await stripe.invoices.listLineItems(id, invoiceOptions);
};
