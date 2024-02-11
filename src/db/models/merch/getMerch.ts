import type { GetMerchProps } from "@app/store";
import Merch from "@db/schema/merch";

export const getMerch = async ({ appId, storeId, merchId, merchIds }: GetMerchProps) => {
  if (storeId) return await Merch.find({ storeId });
  if (merchIds) return await Merch.find({ uid: merchIds });
  if (merchId && storeId) return await Merch.findOne({ uid: merchId, storeId });
  if (merchId) return await Merch.findOne({ uid: merchId });
  if (appId) return await Merch.findOne({ appId });
};
