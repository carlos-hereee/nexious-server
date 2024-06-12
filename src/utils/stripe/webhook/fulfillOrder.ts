import { updateStore } from "@db/models/store/updateStore";
import Stripe from "stripe";

interface OrderData {
  accountId: string;
  status: "paid" | "unpaid" | "no_payment_required";
  lineItems?: Stripe.ApiList<Stripe.LineItem>;
}
export const fulFillOrder = async ({ lineItems, accountId, status }: OrderData) => {
  // TODO: fill me in
  // console.log("Fulfilling order", lineItems);
  if (lineItems) {
    if (status === "paid") {
      console.log("lineItems :>> ", lineItems);
      lineItems.data.forEach((d) => {
        // update merch quantity
        const quantity = d.quantity;
        // track merch with ids
        const priceId = d.price?.id;
        const productId = d.price?.product;
        // update to complete orders
        console.log("d :>> ", d);
      });
      // await updateStore({ accountId,  type: "checkout-complete"});
    }
  }
};
