import { StripePaymentAttachedEvent } from "types/stripe";

export const paymentAttached = (event: StripePaymentAttachedEvent) => {
  const paymentMethod = event.data.object;
  console.log("paymentAttached :>> ", paymentMethod);
  // Then define and call a method to handle the successful attachment of a PaymentMethod.
  // handlePaymentMethodAttached(paymentMethod);
};
