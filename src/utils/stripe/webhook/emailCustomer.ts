import Stripe from "stripe";

// Send an email to the customer asking them to retry their order
export const emailCustomerAboutFailedPayment = (event: Stripe.CheckoutSessionAsyncPaymentFailedEvent) => {
  console.log("payment failed emailing customer :>> ", event);
};
