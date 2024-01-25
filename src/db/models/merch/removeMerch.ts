import type { GetMerchProps } from "@app/store";
import Merch from "@dbSchema/merch.js";

export const removeMerch = async ({ storeId, appId, deleteMany, merchId }: GetMerchProps) => {
  if (merchId) return await Merch.findOneAndDelete({ merchId });
  if (deleteMany) return await Merch.deleteMany({ storeId });
  return await Merch.findOneAndDelete({ storeId, appId });
};
