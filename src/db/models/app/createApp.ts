import type { AppPayload } from "@app/app";
import App from "@db/schema/app";

export const createApp = async (payload: AppPayload) => {
  return await App.create(payload);
};
