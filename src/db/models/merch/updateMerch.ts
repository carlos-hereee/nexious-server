import { MerchSchema } from "@app/store";
import Merch from "@db/schema/merch";

interface MerchUpdateFilter {
  merchHold?: { merchId: string; quantity: number };
  merchPurchased?: { productId: string; quantity: number };
  merch?: MerchSchema;
}
export const updateMerch = async ({ merchHold, merch, merchPurchased }: MerchUpdateFilter) => {
  // add merch on hold
  if (merchHold) {
    return await Merch.updateOne(
      { merchId: merchHold.merchId },
      { $inc: { onHold: merchHold.quantity, inStock: -merchHold.quantity } }
    );
  }
  if (merchPurchased) {
    return await Merch.updateOne(
      { productId: merchPurchased.productId },
      { $inc: { inStock: -merchPurchased.quantity } }
    );
  }
  if (merch) return await Merch.updateOne({ merchId: merch.merchId }, { $set: merch });
  // if (deleteMany) return await Merch.deleteMany({ storeId });
  // return await Merch.findOneAndDelete({ storeId, appId });
};
