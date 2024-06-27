import type { MerchSchema } from "@app/store";
import { addPrice, addProduct } from "@utils/stripe/merch/addProduct";
import Stripe from "stripe";

interface AddProductInfoParams {
  accountId: string;
  currency: string;
  merch: MerchSchema;
}

export const addProductInfo = async ({ merch, accountId, currency }: AddProductInfoParams) => {
  if (!currency) return { error: "store currency required to continue", merch };

  // product data
  const productInfo: Stripe.ProductCreateParams = { name: merch.name, description: merch.description };
  // add images if any in catalog
  if (merch.catalog && merch.catalog.length > 0) productInfo.images = merch.catalog.filter((_, idx) => _ && idx < 8);
  // prices data
  const pricesInfo: Stripe.PriceCreateParams = { currency, product: "", unit_amount: merch.cost };
  const stripeAccount = accountId ? { stripeAccount: accountId } : undefined;

  // add to stripe
  const product = await addProduct({ addProductOptions: productInfo, stripeAccount });
  merch.productId = product.id;
  // product data link prices
  pricesInfo.product = product.id;
  if (product.id) {
    // add price to product
    const price = await addPrice({ addPriceOptions: pricesInfo, stripeAccount });
    merch.priceId = price.id;
  }
  return { merch, error: "" };
};
// export const addSubscriptionInfo = async ({ merch, accountId }: AddProductInfoParams) => {
//   // const { currency, accountId: stripeAccount } = store;
//   // if (!currency) return { error: "store currency required to continue", merch };
//   // if (!stripeAccount) return { error: "stripe account is  required to continue", merch };

//   // product data
//   const productInfo: Stripe.ProductCreateParams = { name, description };

//   // prices data
//   const pricesInfo: Stripe.PriceCreateParams = { currency, product: "", unit_amount: merch.cost };
//   // add to stripe
//   const product = await addProduct({ addProductOptions: productInfo, stripeAccount: { stripeAccount } });
//   merch.productId = product.id;
//   // product data link prices
//   pricesInfo.product = product.id;
//   if (product.id) {
//     // add price to product
//     const price = await addPrice({ addPriceOptions: pricesInfo, stripeAccount: { stripeAccount } });
//     merch.priceId = price.id;
//   }
//   return { merch, error: "" };
// };
