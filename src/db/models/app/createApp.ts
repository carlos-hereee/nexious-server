import type { AppPayload } from "@app/app";
import App from "@dbSchema/app";

export const createApp = async (payload: AppPayload) => {
  return await App.create(payload);
};
