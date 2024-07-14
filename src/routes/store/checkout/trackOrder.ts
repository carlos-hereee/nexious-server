import type { StoreRequest } from "@app/request";
import { getOrder } from "@db/models/store/getStore";
import { useGenericErrors } from "@utils/auth/useGenericErrors";
import type { Response } from "express";

export const trackOrder = async (req: StoreRequest, res: Response) => {
  try {
    const order = await getOrder(req.params.orderId);
    if (order) {
      return res.status(200).json(order).end();
    }
  } catch (error) {
    return useGenericErrors(res, error, "unable to create stripe session");
  }
};
