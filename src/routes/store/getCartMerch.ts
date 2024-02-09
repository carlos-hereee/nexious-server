import type { Response, NextFunction } from "express";
import { useGenericErrors } from "@authUtils/useGenericErrors";
import { CartRequest } from "@app/store";

export const getCartMerch = (req: CartRequest, res: Response, next: NextFunction) => {
  try {
    req.cart = req.body.cart.map((m) => {
      return { productId: m.productId, quantity: m.quantity || 1 };
    });
    next();
  } catch (error) {
    useGenericErrors(res, error, "unable to retrieve merch data");
  }
};
