import { MerchSchema } from "@app/store";
import Merch from "@db/schema/merch";

interface MerchUpdateFilter {
  merchHold?: { merchId: string; quantity: number };
  merch?: MerchSchema;
}
export const updateMerch = async ({ merchHold, merch }: MerchUpdateFilter) => {
  // add merch on hold
  if (merchHold) {
    return await Merch.updateOne(
      { merchId: merchHold.merchId },
      { $inc: { onHold: merchHold.quantity, inStock: -merchHold.quantity } }
    );
  }
  if (merch) return await Merch.updateOne({ merchId: merch.merchId }, { $set: merch });
  // if (deleteMany) return await Merch.deleteMany({ storeId });
  // return await Merch.findOneAndDelete({ storeId, appId });
};
