// import S from "stripe";

// //  define and call a method to handle the subscription created.
// export const invoicePaid = async (event: S.InvoicePaidEvent) => {
//   // Continue to provision the subscription as payments continue to be made.
//   // Store the status in your database and check when a user accesses your service.
//   // This approach helps you avoid hitting rate limits.
//   const invoice = event.data.object;
//   const status = invoice.status;
//   // console.log("invoice event :>> ", event);
//   console.log(`invoice status is ${status}.`);
//   // handleSubscriptionCreated(subscription);
// };
// export const invoicePaymentFailed = async (event: S.InvoicePaymentFailedEvent) => {
//   console.log("event.data.object :>> ", event.data.object);
//   // Continue to provision the subscription as payments continue to be made.
//   // The payment failed or the customer does not have a valid payment method.
//   // The subscription becomes past_due. Notify your customer and send them to the
//   // customer portal to update their payment information.
//   //          there are several possible actions to take:
//   //1. Notify the customer.
//   //2 If you’re using PaymentIntents, collect new payment information and confirm the PaymentIntent.
//   //3 Update the default payment method on the subscription.
//   //4 Consider enabling Smart Retries.
// };
