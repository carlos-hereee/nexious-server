import { IStoreSchema, MerchSchema } from "@app/store";
import { addPrice } from "@utils/stripe/merch/addPrice";
import { addProduct } from "@utils/stripe/merch/addProduct";
import Stripe from "stripe";

interface AddProductInfoParams {
  store: IStoreSchema;
  merch: MerchSchema;
}
export const addProductInfo = async ({ merch, store }: AddProductInfoParams) => {
  const { currency, accountId: stripeAccount } = store;
  if (!currency) return { error: "store currency required to continue", merch };
  if (!stripeAccount) return { error: "stripe account is  required to continue", merch };

  // product data
  const productInfo: Stripe.ProductCreateParams = { name: merch.name, description: merch.description };
  // add images if any in catalog
  if (merch.catalog.length > 0) productInfo.images = merch.catalog.filter((_, idx) => _ && idx < 8);
  // prices data
  const pricesInfo: Stripe.PriceCreateParams = { currency, product: "", unit_amount: merch.cost };
  // add to stripe
  const product = await addProduct({ addProductOptions: productInfo, stripeAccount: { stripeAccount } });
  merch.productId = product.id;
  // product data link prices
  pricesInfo.product = product.id;
  if (product.id) {
    // add price to product
    const price = await addPrice({ addPriceOptions: pricesInfo, stripeAccount: { stripeAccount } });
    merch.priceId = price.id;
  }
  return { merch, error: "" };
};
