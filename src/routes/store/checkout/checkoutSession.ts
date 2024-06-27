import type { StoreRequest } from "@app/request";
import type { CartBody, IOrderShema } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";
import { updateStore } from "@db/models/store/updateStore";
import { v4 } from "uuid";
import { createCheckoutSession } from "@utils/stripe/payments/createCheckoutSession";

export const checkoutSession = async (req: StoreRequest<CartBody>, res: Response) => {
  try {
    const { cart, accountId } = req.body;
    const someInstore = cart.some((c) => !c.productId);
    const orderId = v4();
    const online = cart.filter((c) => c.productId);
    const order: IOrderShema = {
      ...req.body,
      status: "pending",
      orderId,
      merch: cart,
      paymentMethod: someInstore ? "in-store-and-online" : "stripe",
    };

    await updateStore({ order, accountId, type: "payment" });
    const cartData = someInstore ? online : cart;
    const session = await createCheckoutSession({ cart: cartData, accountId, orderId, mode: "payment" });
    return res.status(200).json(session.url).end();
  } catch (error) {
    return useGenericErrors(res, error, "unable to create stripe session");
  }
};
