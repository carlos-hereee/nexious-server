interface MerchBody {
  // productId: string;
  // merchId?: string;
  priceId: string;
  quantity: number;
}

export const formatMerchData = (cart: MerchBody[]) => {
  return cart.map((m) => {
    return { price: m.priceId, quantity: m.quantity || 1 };
  });
};
