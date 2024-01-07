import { clientUrl } from "@config";
import stripe from "../connection";

export const createCheckoutSession = async ({ cartData, mode, stripeAccount }) => {
  if (!stripeAccount) {
    return await stripe.checkout.sessions.create({
      line_items: cartData,
      mode,
      // payment_intent_data: { application_fee_amount: 123 },
      success_url: clientUrl + "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: clientUrl + "/checkout",
      automatic_tax: { enabled: true },
    });
  }
  return await stripe.checkout.sessions.create(
    {
      line_items: cartData,
      mode,
      // payment_intent_data: { application_fee_amount: 123 },
      success_url: clientUrl + "/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: clientUrl + "/checkout",
      automatic_tax: { enabled: true },
    }
    // { stripeAccount }
  );
};
