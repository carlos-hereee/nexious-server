import type { GetMerchProps } from "@app/store.js";
import Merch from "@dbSchema/merch.js";

export const getMerch = async ({ appId, storeId, merchId, merchIds }: GetMerchProps) => {
  if (storeId) return await Merch.find({ storeId });
  if (merchIds) return await Merch.find({ uid: merchIds });
  if (merchId && storeId) return await Merch.findOne({ uid: merchId, storeId });
  if (merchId) return await Merch.findOne({ uid: merchId });
  if (appId) return await Merch.findOne({ appId });
};
