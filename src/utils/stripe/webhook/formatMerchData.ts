interface MerchBody {
  productId: string;
  priceId: string;
  merchId: string;
  quantity: number;
}

export const formatMerchData = (cart: MerchBody[]) => {
  return cart.map((m) => {
    return { price: m.priceId, quantity: m.quantity || 1 };
  });
};
