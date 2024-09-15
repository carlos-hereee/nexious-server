import type { CheckoutMerch } from "@app/store";
import stripe from "../connection";
import { formatMerchData } from "@routes/stripe/webhook/formatMerchData";
import { clientUrl } from "@utils/app/config";

interface SessionParams {
  cart: CheckoutMerch[];
  accountId?: string;
  metadata?: { [key: string]: string };
  mode: "payment" | "subscription";
}

export const createCheckoutSession = async ({ cart, accountId, metadata, mode }: SessionParams) => {
  const cartData = formatMerchData(cart);
  return await stripe.checkout.sessions.create(
    {
      mode,
      billing_address_collection: mode === "payment" ? "required" : "auto",
      line_items: cartData,
      success_url: `${clientUrl}/checkout/success/?success=true&session_id={CHECKOUT_SESSION_ID}&accountId=${accountId}`,
      cancel_url: `${clientUrl}/checkout/error/?canceled=true`,
      // platform fee in payment mode as you cannot pass payment initent data on subscription mode
      payment_intent_data: mode === "payment" ? { application_fee_amount: 123 } : undefined,
      // // let stripe handle tax
      // automatic_tax: { enabled: true },
      // add orderid if order is already in system
      metadata: metadata || undefined,
      // TODO: ADD TRIAL PERIOD
      // subscription_data: {
      //   trial_period_days: 7,
      // },
    },
    accountId ? { stripeAccount: accountId } : undefined
  );
};
