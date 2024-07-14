import type { GetMerchProps } from "@app/store";
import Orders from "@db/schema/order";
import Store from "@db/schema/store";

export const getStore = async ({ appId, storeId, id, accountId }: GetMerchProps) => {
  if (id) return await Store.findOne({ _id: id });
  if (appId) return await Store.findOne({ appId });
  if (storeId) return await Store.findOne({ storeId });
  if (accountId) return await Store.findOne({ accountId });
  // return null;
};
export const getOrder = async (orderId: string) => {
  return await Orders.findOne({ orderId });
};
