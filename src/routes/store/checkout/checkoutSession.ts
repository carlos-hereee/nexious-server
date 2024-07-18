import type { StoreRequest } from "@app/request";
import type { CartBody } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";
import { v4 } from "uuid";
import { createCheckoutSession } from "@utils/stripe/payments/createCheckoutSession";
import Orders from "@db/schema/order";
import { getStore } from "@db/models/store/getStore";

export const checkoutSession = async (req: StoreRequest<CartBody>, res: Response) => {
  try {
    // key variables
    const { cart, accountId, store } = req.body;
    const someInstore = cart.some((c) => !c.productId);
    const orderId = v4();
    const online = cart.filter((c) => c.productId);
    const metadata = { orderId };
    const cartData = someInstore ? online : cart;
    const order = await Orders.create({
      ...req.body,
      status: "pending",
      orderId,
      merch: cart,
      paymentMethod: someInstore ? "in-store-and-online" : "stripe",
    });
    // link order to user and store
    const s = await getStore({ storeId: store.storeId });
    if (req.user) {
      req.user.orders.push(order._id);
      await req.user.save();
    }
    if (s) {
      s.orders.push(order._id);
      await s.save();
    }

    const session = await createCheckoutSession({ cart: cartData, accountId, metadata, mode: "payment" });
    return res.status(200).json(session.url).end();
  } catch (error) {
    return useGenericErrors(res, error, "unable to create stripe session");
  }
};
