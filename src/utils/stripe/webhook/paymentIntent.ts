import { StripePaymentIntentFailed, StripeSuccessEvent } from "@app/stripe";

export const paymentIntentSucceeded = (event: StripeSuccessEvent) => {
  const paymentIntent = event.data.object;
  // console.log("paymentIntent :>> ", paymentIntent);
  console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
  // Then define and call a method to handle the successful payment intent.
  // handlePaymentIntentSucceeded(paymentIntent);
};
export const paymentIntentFailed = (event: StripePaymentIntentFailed) => {
  const paymentIntent = event.data.object;
  console.log("event :>> ", paymentIntent);
  // console.log("paymentIntent :>> ", paymentIntent);
  console.log(`PaymentIntent for ${paymentIntent.amount} failed!`);
  // Then define and call a method to handle the failed payment intent.
  // handlePaymentIntentSucceeded(paymentIntent);
};
