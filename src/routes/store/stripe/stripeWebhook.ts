import { Response } from "express";
import { checkoutCompleted } from "@utils/stripe/webhook/checkoutCompleted";
// import { paymentIntentFailed, paymentIntentSucceeded } from "@utils/stripe/webhook/paymentIntent";
// import { paymentAttached } from "@utils/stripe/webhook/paymentAttached";
import { StripeWebhookRequest } from "@app/request";
import { accountUpdated } from "@utils/stripe/webhook/accountUpdated";
import { fulFillOrder } from "@utils/stripe/webhook/fulfillOrder";
// import { emailCustomerAboutFailedPayment } from "@utils/stripe/webhook/emailCustomer";
// import { productCreated } from "./stripe/stripeProduct";

export const stripeWebhook = async (req: StripeWebhookRequest, res: Response) => {
  const event = req.stripeEvent;
  if (event) {
    // Handle the event
    switch (event.type) {
      //   case "payment_intent.succeeded":
      //     paymentIntentSucceeded(event);
      //     break;
      //   case "payment_intent.payment_failed":
      //     paymentIntentFailed(event);
      //     break;
      // case "payment_method.attached":
      //   paymentAttached(event);
      //   break;
      // case "product.created":
      //   productCreated(event);
      //   break;
      // The customer has successfully updated their stripe account
      case "account.updated":
        await accountUpdated(event);
        break;
      // case "capability.updated":
      //   // console.log("capabilty updated :>> ", event);
      //   // if user was not fully onboarded check details_submitted parameter on their account
      //   // paymentAttached(event);
      //   break;
      // The customer has successfully authorized the payment by submitting the Checkout form.
      case "checkout.session.completed":
        await checkoutCompleted(event);
        break;
      // payment received fulfill the purchase...
      case "checkout.session.async_payment_succeeded":
        await fulFillOrder(event);
        break;
      // // payment was declined, or failed for some other reason.
      // case "checkout.session.async_payment_failed":
      //   emailCustomerAboutFailedPayment(event);
      //   break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    res.status(200).end();
  } else res.status(400).end();
};
