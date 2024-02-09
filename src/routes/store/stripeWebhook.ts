import { Response } from "express";
import { checkoutCompleted } from "@stripe/webhook/checkoutCompleted";
import { paymentIntentSucceeded } from "@stripe/webhook/paymentIntentSucceeded";
import { paymentAttached } from "@stripe/webhook/paymentAttached";
import { StripeWebhookRequest } from "@app/request";

export const stripeWebhook = async (req: StripeWebhookRequest, res: Response) => {
  const event = req.stripeEvent;
  if (event) {
    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        paymentIntentSucceeded(event);
        break;
      case "payment_method.attached":
        paymentAttached(event);
        break;
      case "checkout.session.completed":
        await checkoutCompleted(event);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    res.status(200).end();
  } else res.status(400).end();
};
