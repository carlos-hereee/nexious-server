import type { MerchSchema } from "@app/store.js";
import Merch from "@dbSchema/merch.js";

export const createMerch = async (payload: MerchSchema) => {
  return await Merch.create(payload);
};
