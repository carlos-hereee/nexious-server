import { StoreRequest } from "@app/request";
import { CartBody } from "@app/store";
import { updateStore } from "@db/models/store/updateStore";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";
import { createSession } from "./stripe/createSession";

export const checkoutSession = async (req: StoreRequest<CartBody>, res: Response) => {
  try {
    const { cart, accountId } = req.body;
    const someInstore = cart.some((c) => !c.productId);
    if (someInstore) {
      const online = cart.filter((c) => c.productId);
      await updateStore({ order: req.body, accountId, type: "payment" });

      const session = await createSession(online, accountId);
      return res.status(200).json(session.url).end();
    } else {
      const session = await createSession(cart, accountId);
      return res.status(200).json(session.url).end();
    }
  } catch (error) {
    return useGenericErrors(res, error, "unable to create stripe session");
  }
};
