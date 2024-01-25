import type { RequestHandler } from "express";
import { getSessionWithId } from "@stripe/payments/getSessionWithId.js";
import { fulFillOrder } from "@stripe/webhook/fulfillOrder.js";

export const stripeWebhook: RequestHandler = async (req, res) => {
  const event = req.stripeEvent;
  if (event) {
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        // const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      case "checkout.session.completed":
        // Handle the checkout.session.completed event
        const sessionComplete = event.data.object;
        // console.log(`Checkout session was successful!`, sessionComplete);
        const sessionOptions = {
          id: sessionComplete.id,
          options: { expand: ["line_items"] },
        };
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await getSessionWithId(sessionOptions);
        const lineItems = sessionWithLineItems.line_items;

        // Fulfill the purchase...
        fulFillOrder(lineItems);

        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // if (event.type === "checkout.session.completed") {
    // Handle the checkout.session.completed event
    // const sessionComplete = event.data.object;
    // console.log(`Checkout session was successful!`, sessionComplete);
    // // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
    // const sessionWithLineItems = await getSessionWithId(sessionComplete.id, {
    //   expand: ["line_items"],
    // });
    // const lineItems = sessionWithLineItems.line_items;

    // // Fulfill the purchase...
    // fulfillOrder(lineItems);

    // }
    res.status(200).end();
  }
};
