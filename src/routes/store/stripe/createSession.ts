import { CheckoutMerch } from "@app/store";
import { clientUrl } from "@utils/app/config";
import { createCheckoutSession } from "@utils/stripe/payments/createCheckoutSession";
import { formatMerchData } from "@utils/stripe/webhook/formatMerchData";

export const createSession = async (cart: CheckoutMerch[], accountId: string) => {
  const cartData = formatMerchData(cart);
  const session = await createCheckoutSession({
    sessionOptions: { mode: "payment", line_items: cartData, success_url: `${clientUrl}/checkout/success` },
    stripeAccount: { stripeAccount: accountId },
  });
  return session;
};
