import { CheckoutMerch } from "@app/store";
import { clientUrl } from "@utils/app/config";
import { createCheckoutSession } from "@utils/stripe/payments/createCheckoutSession";
import { formatMerchData } from "@utils/stripe/webhook/formatMerchData";

export const createSession = async (cart: CheckoutMerch[], accountId: string, orderId?: string) => {
  const cartData = formatMerchData(cart);
  const session = await createCheckoutSession({
    sessionOptions: {
      mode: "payment",
      line_items: cartData,
      success_url: `${clientUrl}/checkout/success`,
      payment_intent_data: {
        // platform fee
        application_fee_amount: 123,
      },
      // let stripe handle tax
      automatic_tax: { enabled: true },
      metadata: orderId ? { orderId } : undefined,
    },
    stripeAccount: { stripeAccount: accountId },
  });
  return session;
};
