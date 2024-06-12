import { StoreRequest } from "@app/request";
import { CartBody } from "@app/store";
import { updateStore } from "@db/models/store/updateStore";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";
import { createSession } from "./stripe/createSession";
import { v4 } from "uuid";

export const checkoutSession = async (req: StoreRequest<CartBody>, res: Response) => {
  try {
    const { cart, accountId } = req.body;
    const someInstore = cart.some((c) => !c.productId);
    if (someInstore) {
      const online = cart.filter((c) => c.productId);
      const orderId = v4();
      await updateStore({ order: { ...req.body, orderId }, accountId, type: "payment" });

      const session = await createSession(online, accountId, orderId);
      return res.status(200).json(session.url).end();
    } else {
      const session = await createSession(cart, accountId);
      return res.status(200).json(session.url).end();
    }
  } catch (error) {
    return useGenericErrors(res, error, "unable to create stripe session");
  }
};
