import { Response } from "express";
import { checkoutCompleted } from "@routes/webhook/checkoutCompleted";
// import { paymentIntentFailed, paymentIntentSucceeded } from "@routes/webhook/webhook/paymentIntent";
// import { paymentAttached } from "@routes/webhook/webhook/paymentAttached";
import type { StripeWebhookRequest } from "@app/request";
import { accountUpdated } from "@routes/webhook/accountUpdated";
import { fulFillOrder } from "@routes/webhook/fulfillOrder";
// import {
//   addCustomerSubscription,
//   customerSubscriptionWillEndSoon,
//   removeCustomerSubscription,
//   updateCustomerSubscription,
// } from "@routes/webhook/updateCustomerSubscription";
import { invoicePaid, invoicePaymentFailed } from "@routes/webhook/updateInvoice";
// import { emailCustomerAboutFailedPayment } from "@routes/webhook/webhook/emailCustomer";
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
      // The minimum event types to monitor:  INVOICE FOR SUBSCRIPTIONS
      case "invoice.paid":
        await invoicePaid(event);
        break;
      case "invoice.payment_failed":
        await invoicePaymentFailed(event);
        break;
      // // SUBSCRIPTION LIFE CYCLE
      // case "customer.subscription.created":
      //   await addCustomerSubscription(event);
      //   break;
      // case "customer.subscription.trial_will_end":
      //   await customerSubscriptionWillEndSoon(event);
      //   break;
      // case "customer.subscription.deleted":
      //   await removeCustomerSubscription(event);
      //   break;
      // case "customer.subscription.updated":
      //   await updateCustomerSubscription(event);
      //   break;
      // case "entitlements.active_entitlement_summary.updated":
      //   const subscription = event.data.object;
      //   console.log(`Active entitlement summary updated for ${subscription}.`);
      //   // Then define and call a method to handle active entitlement summary updated
      //   // handleEntitlementUpdated(subscription);
      //   break;
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
