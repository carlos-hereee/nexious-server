import type { StoreRequest } from "@app/request";
import type { IOrderShema, StoreSessionBody } from "@app/store";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";
import { updateStore } from "@db/models/store/updateStore";
import { updateApp } from "@db/models/app/updateApp";
import { addNotification } from "@utils/app/addNotification";

export const storeSession = async (req: StoreRequest<StoreSessionBody>, res: Response) => {
  try {
    const { cart, client } = req.body;

    const { storeId, email, location, location2, appId } = req.store;
    const store = { storeId, email, location: location || "", location2: location2 || "" };
    // format order data
    const order: IOrderShema = { store, client, merch: cart, status: "pending", paymentMethod: "in-store" };
    // create notification
    const n = await addNotification({ type: "order-in-store", message: `An order was submited` });
    await updateApp({ id: appId, type: "add-notification", notificationId: n._id });

    // add order to store pending order
    await updateStore({ type: "payment", order, storeId });

    res.status(200).json(order).end();
  } catch (error) {
    return useGenericErrors(res, error, "unable to create store session");
  }
};
