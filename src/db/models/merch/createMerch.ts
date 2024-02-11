import type { MerchSchema } from "@app/store";
import Merch from "@db/schema/merch";

export const createMerch = async (payload: MerchSchema) => {
  return await Merch.create(payload);
};
