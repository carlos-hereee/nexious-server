import { Response } from "express";
import { checkoutCompleted } from "@utils/stripe/webhook/checkoutCompleted";
import { paymentIntentSucceeded } from "@utils/stripe/webhook/paymentIntentSucceeded";
import { paymentAttached } from "@utils/stripe/webhook/paymentAttached";
import { StripeWebhookRequest } from "@app/request";
import { accountUpdated } from "@utils/stripe/webhook/accountUpdated";

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
      case "account.updated":
        await accountUpdated(event);
        // paymentAttached(event);
        break;
      case "capability.updated":
        // console.log("capabilty updated :>> ", event);
        // if user was not fully onboarded check details_submitted parameter on their account
        // paymentAttached(event);
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
