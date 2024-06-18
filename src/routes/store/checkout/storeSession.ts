import { StoreRequest } from "@app/request";
import { IOrderShema, StoreSessionBody } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";

import { updateStore } from "@db/models/store/updateStore";

export const storeSession = async (req: StoreRequest<StoreSessionBody>, res: Response) => {
  try {
    const { cart, client } = req.body;

    const { storeId, email, location, location2, accountId } = req.store;
    const store = { storeId, email, location: location || "", location2: location2 || "" };
    // format order data
    const order: IOrderShema = { store, client, merch: cart, status: "pending" };
    // add order to store pending order
    await updateStore({ type: "payment", order, accountId: accountId || "" });

    res.status(200).json(order).end();
  } catch (error) {
    return useGenericErrors(res, error, "unable to create store session");
  }
};
