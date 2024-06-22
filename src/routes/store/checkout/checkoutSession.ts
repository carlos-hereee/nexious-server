import { StoreRequest } from "@app/request";
import { CartBody, IOrderShema } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";
import { createSession } from "../stripe/createSession";
import { updateStore } from "@db/models/store/updateStore";
import { v4 } from "uuid";

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
    const session = await createSession(someInstore ? online : cart, accountId, orderId);
    return res.status(200).json(session.url).end();
  } catch (error) {
    return useGenericErrors(res, error, "unable to create stripe session");
  }
};
