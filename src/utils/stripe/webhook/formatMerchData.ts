import { CartBody } from "@app/store";

export const formatMerchData = (cart: CartBody) => {
  return cart.merch.map((m) => {
    return { productId: m.productId, quantity: m.quantity || 1 };
  });
};
