import Merch from "@db/schema/merch";

interface MerchUpdateFilter {
  merchHold?: { merchId: string; quantity: number };
}
export const updateMerch = async ({ merchHold }: MerchUpdateFilter) => {
  // add merch on hold
  if (merchHold) {
    return await Merch.updateOne(
      { merchId: merchHold.merchId },
      { $inc: { onHold: merchHold.quantity, inStock: -merchHold.quantity } }
    );
  }
  // if (deleteMany) return await Merch.deleteMany({ storeId });
  // return await Merch.findOneAndDelete({ storeId, appId });
};
