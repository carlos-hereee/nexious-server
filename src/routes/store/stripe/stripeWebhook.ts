import { Response } from "express";
import { checkoutCompleted } from "@utils/stripe/webhook/checkoutCompleted";
// import { paymentIntentFailed, paymentIntentSucceeded } from "@utils/stripe/webhook/paymentIntent";
// import { paymentAttached } from "@utils/stripe/webhook/paymentAttached";
import type { StripeWebhookRequest } from "@app/request";
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
      // INVOICE FOR SUBSCRIPTIONS
      // TODO: INVOICE PAID
      case "invoice.paid":
        // Continue to provision the subscription as payments continue to be made.
        // Store the status in your database and check when a user accesses your service.
        // This approach helps you avoid hitting rate limits.
        break;
      // TODO: INVOICE PAYMENT FAILED
      case "invoice.payment_failed":
        // The payment failed or the customer does not have a valid payment method.
        // The subscription becomes past_due. Notify your customer and send them to the
        // customer portal to update their payment information.
        //          there are several possible actions to take:

        //1. Notify the customer.
        //2 If you’re using PaymentIntents, collect new payment information and confirm the PaymentIntent.
        //3 Update the default payment method on the subscription.
        //4 Consider enabling Smart Retries.
        break;
      // TODO: SUBSCRIPTION LIFE CYCLE
      case "customer.subscription.trial_will_end":
        // const subscription = event.data.object;
        // const status = subscription.status;
        // console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case "customer.subscription.deleted":
        // const subscription = event.data.object;
        // const status = subscription.status;
        // console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case "customer.subscription.created":
        // const subscription = event.data.object;
        // const status = subscription.status;
        // console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case "customer.subscription.updated":
        // const subscription = event.data.object;
        // const status = subscription.status;
        // console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
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
