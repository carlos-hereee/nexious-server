import { StripeSuccessEvent } from "@app/stripe";

export const paymentIntentSucceeded = (event: StripeSuccessEvent) => {
  const paymentIntent = event.data.object;
  console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
  // Then define and call a method to handle the successful payment intent.
  // handlePaymentIntentSucceeded(paymentIntent);
};
