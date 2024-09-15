import type { MerchSchema } from "@app/store";
import { addPrice, addProduct } from "@utils/stripe/merch/addProduct";

interface AddProductInfoParams {
  accountId: string;
  currency: string;
  merch: MerchSchema;
}

export const addProductInfo = async ({ merch, accountId, currency }: AddProductInfoParams) => {
  if (!currency) return { error: "store currency required to continue", merch };

  // add new product
  await addProduct({ accountId, merch });
  // add price to product
  await addPrice({ merch, currency, accountId });

  return { merch, error: "" };
};
