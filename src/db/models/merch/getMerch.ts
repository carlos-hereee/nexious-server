import type { GetMerchProps } from "types/store";
import Merch from "@db/schema/merch";

export const getMerch = async ({ appId, storeId, merchId }: GetMerchProps) => {
  if (merchId) return await Merch.findOne({ merchId });
  if (merchId && storeId) return await Merch.findOne({ uid: merchId, storeId });
  if (appId) return await Merch.findOne({ appId });
};
export const getAllMerc = async ({ merchIds, storeId }: GetMerchProps) => {
  if (storeId) return await Merch.find({ storeId });
  if (merchIds) return await Merch.find({ uid: merchIds });
};
